---
title: "Building an Enterprise-Grade Zero-Data-Leak Offline RAG Pipeline with Ollama, LangChain, and ChromaDB"
description: "A complete step-by-step engineering guide to creating an air-gapped, privacy-first Retrieval-Augmented Generation (RAG) system with local embeddings, ChromaDB, and Ollama."
date: "2026-10-02"
author: "VNHAX Editorial"
category: "Developer Tutorials"
tags: ["RAG", "LangChain", "Ollama", "ChromaDB", "Vector Database", "Python", "Local AI"]
readTime: "12 min read"
image: "/og-image.png"
---

Enterprises, healthcare organizations, legal firms, and security-conscious developers frequently face a critical challenge: they need the analytical and semantic search power of Large Language Models (LLMs), but regulatory compliance (GDPR, HIPAA, SOC 2) strictly prohibits transmitting proprietary documentation to third-party cloud APIs.

The solution is an **air-gapped, 100% local Retrieval-Augmented Generation (RAG)** pipeline.

By combining **Ollama** for local inference and vector embeddings, **ChromaDB** for local persistent vector storage, and **LangChain (LCEL)** for declarative orchestration, you can deploy a zero-data-leak knowledge engine that runs entirely on local hardware.

> **Key Architecture Takeaways**
> * **Zero Network Egress:** Every stage of the pipeline—document parsing, chunking, dense vector embedding, semantic retrieval, and synthesis—executes completely offline within your local environment.
> * **Embedding Selection Matters:** For dense semantic retrieval, lightweight embedding models like `nomic-embed-text` (768 dimensions, 8192 context length) significantly outperform legacy 384-dimension models while maintaining rapid CPU/GPU inference.
> * **Chunking Strategy:** Using semantic boundary chunking (`RecursiveCharacterTextSplitter` with 800 token chunks and 150 token overlap) prevents fragmenting sentences across paragraphs and maintains coherent contextual references.
> * **Maximal Marginal Relevance (MMR):** Rather than standard cosine similarity top-k search, MMR retrieval ensures diverse information sources are injected into the LLM prompt, eliminating duplicate paragraphs.

---

## 1. System Architecture: The Offline RAG Stack

In a local RAG architecture, documents never leave the host operating system. The workflow is divided into two primary loops: the **Ingestion Loop** (offline document indexing) and the **Inference Loop** (real-time query answering).

```
=====================================================================
                      OFFLINE RAG ARCHITECTURE
=====================================================================
INGESTION LOOP:
PDFs / Markdown / Code 
        |
        v
[ RecursiveCharacterTextSplitter ]
        |  (Chunks: 800 tokens, Overlap: 150)
        v
[ Ollama: nomic-embed-text ] (Local Dense Vectors)
        |
        v
[ ChromaDB Persistent Disk Store ] (SQLite + HNSW Index)

---------------------------------------------------------------------
INFERENCE LOOP:
User Query ---> [ Embed Query ] ---> [ ChromaDB MMR Search ]
                                             |
                                             v
                                   Top-4 Retrieved Contexts
                                             |
                                             v
Prompt Template + Context + User Question ---> [ Ollama: Llama 3.3 / Qwen ]
                                                       |
                                                       v
                                            Streamed Local Response
=====================================================================
```

---

## 2. Prerequisites & Environment Setup

Ensure you have Python 3.10+ installed and the latest version of Ollama running on your workstation.

### Step 1: Install Required Python Libraries
```bash
pip install langchain langchain-community langchain-chroma chromadb ollama pypdf tiktoken
```

### Step 2: Pull the Embeddings and Generation Models
Run the following commands in your terminal to download the optimized models via Ollama:

```bash
# Pull the high-performance embedding model (8k context)
ollama pull nomic-embed-text

# Pull the generation model (Llama 3.3 70B or Qwen 2.5 14B)
ollama pull qwen2.5:14b
```

---

## 3. High-Quality Chunking & Vector Ingestion

The biggest point of failure in real-world RAG systems is poor chunking. If chunks are too small, they lose broader context. If they are too large, irrelevant noise pollutes the prompt window.

Here is the production-ready ingestion script (`ingest.py`):

```python
import os
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_chroma import Chroma

# Configuration constants
DOCS_DIR = "./documents"
DB_DIR = "./chroma_db"
EMBED_MODEL = "nomic-embed-text"

def run_ingestion():
    print(f"[*] Scanning {DOCS_DIR} for PDF and text records...")
    
    if not os.path.exists(DOCS_DIR):
        os.makedirs(DOCS_DIR)
        print(f"[!] Created directory {DOCS_DIR}. Please place your documents here.")
        return

    loader = PyPDFDirectoryLoader(DOCS_DIR)
    raw_documents = loader.load()
    print(f"[+] Loaded {len(raw_documents)} raw document pages.")

    # High-precision semantic splitter
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
        length_function=len,
        is_separator_regex=False,
        separators=["\n\n", "\n", ". ", " ", ""]
    )

    chunks = text_splitter.split_documents(raw_documents)
    print(f"[+] Partitioned documents into {len(chunks)} contextual chunks.")

    # Initialize local Ollama embeddings
    embeddings = OllamaEmbeddings(
        model=EMBED_MODEL,
        base_url="http://localhost:11434"
    )

    print("[*] Generating dense vector embeddings and indexing into ChromaDB...")
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=DB_DIR,
        collection_name="enterprise_knowledge"
    )

    print(f"[SUCCESS] Vector store built with {vector_store._collection.count()} vectors.")

if __name__ == "__main__":
    run_ingestion()
```

---

## 4. Query Pipeline with LangChain Expression Language (LCEL)

Now, let's assemble the retrieval and generation pipeline (`rag_query.py`). We will use **Maximal Marginal Relevance (MMR)** to balance relevance with diversity and prevent redundant chunks from consuming token budgets.

```python
import sys
from langchain_chroma import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.chat_models import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

DB_DIR = "./chroma_db"
EMBED_MODEL = "nomic-embed-text"
LLM_MODEL = "qwen2.5:14b"

def build_rag_chain():
    # Load embedding model
    embeddings = OllamaEmbeddings(
        model=EMBED_MODEL,
        base_url="http://localhost:11434"
    )

    # Connect to persistent ChromaDB
    vector_store = Chroma(
        persist_directory=DB_DIR,
        embedding_function=embeddings,
        collection_name="enterprise_knowledge"
    )

    # Configure MMR retriever: top 15 fetched, top 4 most diverse returned
    retriever = vector_store.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 4, "fetch_k": 15, "lambda_mult": 0.7}
    )

    # Initialize local Ollama LLM with streaming support
    llm = ChatOllama(
        model=LLM_MODEL,
        temperature=0.2, # Low temperature for factual precision
        base_url="http://localhost:11434"
    )

    # Strict system prompt ensuring answers cite provided context
    system_prompt = (
        "You are an authoritative enterprise knowledge assistant. "
        "Answer the user's question using ONLY the retrieved context below. "
        "If the answer cannot be deduced with certainty from the context, state: "
        "'The provided documentation does not contain sufficient details to answer this.' "
        "Never hallucinate or extrapolate beyond the provided text.\n\n"
        "Retrieved Context:\n{context}"
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{question}")
    ])

    def format_docs(docs):
        formatted = []
        for i, doc in enumerate(docs, 1):
            source = doc.metadata.get('source', 'Unknown')
            page = doc.metadata.get('page', 0)
            formatted.append(f"[Document {i} | Source: {source} (Page {page})]\n{doc.page_content}")
        return "\n\n".join(formatted)

    # LCEL Declarative Pipeline
    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    return rag_chain

def main():
    rag_chain = build_rag_chain()
    print("\n[+] Local RAG System Ready. Type 'exit' to quit.\n" + "="*50)

    while True:
        try:
            query = input("\n[Question]: ")
            if query.strip().lower() in ['exit', 'quit']:
                break
            if not query.strip():
                continue

            print("\n[Assistant]: ", end="", flush=True)
            for chunk in rag_chain.stream(query):
                print(chunk, end="", flush=True)
            print()
        except KeyboardInterrupt:
            break

if __name__ == "__main__":
    main()
```

---

## 5. Performance Benchmarks: Embedding Models Compared

Choosing the right local embedding model dictates both retrieval quality (recall@k) and CPU/GPU memory footprint:

| Embedding Model | Dimension | Context Length | MTEB Retrieval Avg | Ollama RAM Usage |
| :--- | :--- | :--- | :--- | :--- |
| **nomic-embed-text** | 768 | 8,192 tokens | 56.2 | ~580 MB |
| **bge-m3** | 1,024 | 8,192 tokens | 58.8 | ~2.2 GB |
| **all-minilm-l6-v2** | 384 | 512 tokens | 41.95 | ~120 MB |
| **mxbai-embed-large**| 1,024 | 512 tokens | 54.4 | ~1.3 GB |

For most enterprise documentation stacks featuring technical tables and multi-page guides, **`nomic-embed-text`** provides the optimal balance of generous context windows (8,192 tokens) and minimal resource overhead.

---

## Frequently Asked Questions

### Can this setup run entirely without an active internet connection?
Yes. Once the initial Python dependencies and Ollama model weights are pulled to your machine, you can disconnect network adapters entirely. All tokenization, vector dot-products, and autoregressive decoding occur on localhost.

### How does ChromaDB handle millions of document vectors?
ChromaDB uses an HNSW (Hierarchical Navigable Small World) index written in C++. For up to several hundred thousand document chunks, retrieval latencies remain under 15 milliseconds on modern NVMe drives. For multi-million scale enterprise deployments, you can migrate to Qdrant or Milvus while keeping the exact same LangChain LCEL pipeline.

### Why is my local RAG hallucinatory on specific queries?
Hallucinations in local RAG are almost always caused by poor retrieval rather than the LLM itself. If the top-k chunks retrieved do not contain the answer, the model attempts to fill the gap. Lowering temperature to `0.1` and adding strict prompt guardrails eliminates this risk.
