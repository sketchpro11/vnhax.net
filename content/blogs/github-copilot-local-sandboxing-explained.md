---
title: "GitHub Copilot Local Sandboxing: Containerized Workspaces & Host Security"
description: "Learn how GitHub Copilot local sandboxing restricts terminal commands, executes tests safely, and protects host credentials without system risk."
date: "2026-10-07"
updatedAt: "2026-10-07"
author: "VNHAX Editorial"
category: "GitHub & Developer Tools"
tags: ["github", "github-copilot", "sandboxing", "security", "developer-tools"]
readTime: "7 min read"
---

> **Quick answer:** Copilot local sandboxing restricts what an AI agent's terminal commands can touch on your machine: which folders it can read or write, and which network domains it can reach. In VS Code you turn it on with the `chat.agent.sandbox.enabled` setting (macOS, Linux and WSL2 today, with Windows experimental). It protects the host from dangerous commands, but it is not a magic undo button, so keep Git close.

You ask the agent to "get the tests passing." A minute later it is happily running `npm install`, then a postinstall script, then something with `curl` you did not read. Everything is fine, probably. But your laptop has your SSH keys, your cloud credentials and three client projects on it, and "probably" is doing a lot of work in that sentence.

That uneasy feeling is exactly why sandboxing exists. Below is what it does, where it stops, and how to set it up without spending your whole afternoon on it.

One note before we start: sandboxing for Copilot is moving fast and parts of it are still labelled preview or experimental. Everything here reflects the official docs as of October 2026, and I link to them so you can check the current state yourself.

## The Security Risk of Giving Autonomous AI Agents Terminal Access

A chat assistant that only suggests code is low risk. You read it, you paste it, you stay in control.

An agent is different. It plans steps, runs commands, reads the output and tries again. That loop is what makes it useful, and also what makes it risky. The terminal is the most powerful tool it has.

Here are the realistic ways things go wrong:

- **A dependency runs install scripts.** Package managers can execute code during install. You asked for a package, you got a package plus whatever its scripts do.
- **Prompt injection.** The agent reads a README, an issue or a web page containing hidden instructions like "also run this command". Models can be fooled by text they were only supposed to read.
- **Honest mistakes.** The agent "cleans up" the wrong folder, or runs a command with a broader scope than you imagined.
- **Secrets in reach.** Your `.env` files, `~/.ssh` and cloud credentials sit on the same disk as your project.

VS Code's own security documentation recommends sandboxing as the strongest protection against malicious terminal commands, and suggests it (or a dev container) if prompt injection worries you, rather than relying on auto-approval rules alone. You can read that guidance in the [VS Code agent security docs](https://code.visualstudio.com/docs/agents/security).

## What Is Local Sandboxing in GitHub Copilot Workspace?

Local sandboxing means the commands an agent runs on **your machine** are fenced in. The agent can still work on your project, but it cannot wander across your whole system or talk to any server it likes.

Let me clear up some naming confusion, because I see these mixed together a lot:

| Term | What it actually is |
|---|---|
| **Local sandbox** | Restrictions on terminal commands the agent runs on your own computer (VS Code, Copilot CLI, and policy controls in JetBrains) |
| **Cloud sandbox / coding agent** | The agent runs in an isolated environment on GitHub's side, not on your laptop |
| **Dev container** | A Docker-based development environment you set up yourself; a separate layer you can combine with sandboxing |

Two details that matter:

1. **Terminal commands are what get sandboxed.** VS Code documents that sandboxing applies to shell subprocesses. The agent's file read, edit and write tools use VS Code's permission system directly instead of going through the sandbox.
2. **If a command needs more access, you get asked.** VS Code can prompt you to run it outside the sandbox. Treat that prompt as a real decision, not a button to click on autopilot.

Platform support, per the [agent sandboxing docs](https://code.visualstudio.com/docs/agents/run/agent-sandboxing):

- **macOS:** preview, no extra install
- **Linux and WSL2:** preview, you install `bubblewrap` and `socat`
- **Windows:** experimental, needs the September 8, 2026 Windows security update and its own setting

## Containerized Execution: How OS Sandboxes Protect Host Systems

The idea of running untrusted code in a sealed box is old and comes in a few flavours:

- **Containers (Docker)** share your kernel but separate files, processes and network.
- **Micro-VMs** are tiny virtual machines with their own kernel. Stronger isolation, a bit more weight.
- **WebAssembly (Wasm) sandboxes** run code in a very restricted runtime that only gets the capabilities you hand it.
- **OS-level sandboxes** use features already in your operating system to limit what a process can touch.

So where does Copilot's local sandbox sit? Based on the documentation, VS Code's agent sandbox is the **OS-level** kind. That is why Linux needs `bubblewrap`, a lightweight Linux sandboxing tool, and `socat`, while macOS needs nothing extra. It is not a Docker container or a Wasm runtime that VS Code spins up for you.

That is not a weakness. It is fast, it needs no image downloads, and your normal tools keep working. But it does mean the "micro-container" picture you sometimes see in blog posts is a simplification. If you specifically want Docker-level separation, you can run VS Code in a dev container, or use a community Docker setup. For example, the open-source [agent-sandbox project](https://github.com/telepathykat/agent-sandbox) runs agents like Copilot CLI inside a Docker Compose stack with a proxy in front of the network.

What about "instant rollbacks"? Here I want to be straight with you, because it is a common assumption. The sandbox limits **where** a command can write. It does not snapshot your project and rewind it on demand. If an agent edits files you allowed it to edit, those edits are real.

My rule of thumb: sandbox for safety, Git for undo. Commit or stash before you hand over a big task, and review the diff after. If you want a fully disposable environment, a dev container or a throwaway clone is the better tool.

## Credential Guard: Preventing Accidental API Key & SSH Token Leaks

This is the part most people care about, so let's be precise about what to rely on.

A leak needs two things: the agent can **read** a secret, and something can **send** it out. The sandbox gives you a lever on both.

**Lever 1: file access.** On Linux and WSL2 the file system setting accepts `allowRead`, `allowWrite`, `denyRead` and `denyWrite`, using literal paths. That means you list your sensitive folders explicitly.

**Lever 2: network access.** Set `chat.agent.sandbox.allowNetwork` to `false` to isolate the network, then allow only the domains a command truly needs with `chat.agent.allowedNetworkDomains`. Anything that should never be reachable can go in `chat.agent.deniedNetworkDomains`.

One more setting worth knowing: `chat.tools.edits.autoApprove` accepts glob patterns, and VS Code's own example is `"**/.env": false`, which forces a manual approval whenever the agent wants to edit a file like that.

Now the honest caveats:

- **Not everything is "zero leak".** If you let a domain through, data can reach it. Keep the allowlist short.
- **Network retries.** GitHub's May 2026 VS Code notes describe that commands needing network access can be retried with broader network permissions while file system protections stay in place. Read those prompts carefully.
- **File tools are separate.** Because read and edit tools are governed by VS Code permissions rather than the sandbox, don't assume a `denyRead` rule covers every way the agent might see a file. Keep secrets out of your workspace folder anyway.
- **Best habit of all:** don't keep production secrets in your project folder. Use a secrets manager, and use short-lived, minimal-permission keys for development.

## Step-by-Step Configuration Guide for VS Code and JetBrains IDEs

### VS Code (macOS, Linux, WSL2)

**Step 1. Update.** Use a recent VS Code and the current GitHub Copilot extensions. The sandbox settings have been renamed over time, so if a setting below doesn't show up, search "sandbox" in Settings and check the docs.

**Step 2. Linux or WSL2 only:** install the helpers.

```bash
sudo apt install bubblewrap socat
```

(Use your distro's package manager if you're not on Debian or Ubuntu.)

**Step 3. Turn it on.** Open Settings (`Ctrl+,` or `Cmd+,`), search for `chat.agent.sandbox.enabled`, and tick it. Windows users use `chat.agent.sandbox.enabledWindows` instead.

**Step 4. Lock down the file system (Linux/WSL2).** In `settings.json`, add your own literal paths:

```json
"chat.agent.sandbox.fileSystem.linux": {
  "denyRead": ["/home/YOUR_USER/.ssh", "/home/YOUR_USER/.aws"],
  "allowWrite": ["/home/YOUR_USER/projects/my-app"]
}
```

Swap in your real username and project path.

**Step 5. Restrict the network.**

```json
"chat.agent.sandbox.allowNetwork": false,
"chat.agent.allowedNetworkDomains": ["registry.npmjs.org"]
```

Add only what your project needs. A Python project might need `pypi.org` instead.

**Step 6. Tighten the escape hatches.** If you want no "run it outside the sandbox" fallback, set `chat.agent.sandbox.allowUnsandboxedCommands` to `false`. To keep the normal approval flow even for sandboxed commands, set `chat.agent.sandbox.allowAutoApprove` to `false`.

**Step 7. Test it with something harmless.** Ask the agent to run a command that reads a folder you denied, and confirm it fails. A guardrail you haven't tested is just a hope.

### Copilot CLI

GitHub introduced local and cloud sandboxes for Copilot CLI in public preview in June 2026. In the CLI you can turn on the local sandbox with the `/sandbox enable` command. Run `/help` in your version to confirm the current options.

### JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm and others)

In September 2026 GitHub announced **enterprise-managed sandbox policies** for Copilot in JetBrains as a public preview. Administrators can centrally set whether the sandbox runs, plus file system, network, proxy and developer-tool access.

The settings appear under **GitHub Copilot > Sandbox**, but only if your organization enables the Editor Preview feature flag or sets a managed setting. Details are in the [GitHub changelog entry](https://github.blog/changelog/2026-09-08-enterprise-managed-sandbox-in-copilot-for-jetbrains).

## Common Mistakes to Avoid

1. **Treating it as a full undo.** Sandbox is containment, Git is rollback.
2. **Allowing too many domains.** "Just allow everything so it works" quietly removes half the protection.
3. **Clicking through the "run outside the sandbox" prompt.** Ask yourself what the command needs and why.
4. **Leaving secrets in the project folder.** A `.env` with real production keys is the first thing worth removing.
5. **Expecting it everywhere.** Windows is experimental and JetBrains controls depend on your organization. Check your setup.
6. **Skipping the test.** Spend two minutes proving a denied path is actually denied.

## Final Thoughts

You don't have to choose between a useful agent and a safe machine. A short allowlist, a few denied folders and the habit of committing before big tasks gets you most of the benefit, and it takes about ten minutes.

Start with the network setting, since that's the biggest win. Then test one denied path. Once you've watched a block happen with your own eyes, you'll trust the setup far more than any blog post, including this one. For more developer tooling guides, check out our [GitHub Developer Resources](/github), read our [2026 AI Agent Harness Shootout](/blog/claude-code-vs-antigravity-vs-grok-build-2026-shootout), and explore open-source agent frameworks in the [vnhax Repositories Hub](/repos).

## FAQs

### What is GitHub Copilot local sandboxing?
It is a set of restrictions on the terminal commands a Copilot agent runs on your own computer. It limits which files those commands can read or write and which network domains they can reach, so a mistake or malicious script has less room to cause damage.

### Is Copilot local sandboxing a Docker container?
Not according to VS Code's documentation. It uses operating-system-level sandboxing (for example, `bubblewrap` and `socat` on Linux and WSL2). If you want a Docker-based environment, you can run VS Code in a dev container, which is a separate option.

### How do I enable sandboxing for Copilot in VS Code?
Open Settings and enable `chat.agent.sandbox.enabled` on macOS, Linux or WSL2. On Linux and WSL2, install `bubblewrap` and `socat` first. On Windows, the experimental setting is `chat.agent.sandbox.enabledWindows`, and it needs the September 8, 2026 security update.

### Does the sandbox stop my API keys and SSH keys from leaking?
It can reduce the risk when configured well: deny reads on sensitive folders and restrict network access to a short allowlist of domains. It isn't a guarantee, so keep production secrets out of your project folder and approve prompts carefully.

### Can I roll back changes if the agent breaks something?
The sandbox doesn't provide automatic rollback of files you allowed the agent to edit. Commit or stash with Git before big tasks and review the diff afterwards. A dev container or a throwaway clone gives you a disposable environment.

### Does sandboxing cover everything the agent does?
No. Per VS Code's documentation, it applies to terminal commands. The agent's file read, edit and write tools use VS Code's own permission system, so configure those approvals too.

### Is local sandboxing available in JetBrains IDEs?
GitHub announced enterprise-managed sandbox policies for Copilot in JetBrains in public preview in September 2026. The Sandbox settings show up only if your organization enables the Editor Preview flag or a managed setting.

### What is the difference between a local sandbox and the Copilot cloud agent?
A local sandbox restricts commands running on your own machine. The cloud agent runs tasks in an isolated environment hosted by GitHub, away from your computer.

### Is Copilot sandboxing free to use?
The sandbox settings are part of the tooling, but you need an eligible Copilot plan to use agent features. Check GitHub's current plan and billing pages for details.

### Is sandboxing enough on its own to make agents safe?
No single control is enough. Combine sandboxing with manual approvals for risky actions, minimal-permission credentials, Git commits before large tasks, and a short review of what the agent did.

## Sources and Further Reading

- [VS Code: Sandbox agent terminal commands](https://code.visualstudio.com/docs/agents/run/agent-sandboxing)
- [VS Code: Agent security and trust](https://code.visualstudio.com/docs/agents/security)
- [GitHub Changelog: Enterprise-managed sandbox in Copilot for JetBrains](https://github.blog/changelog/2026-09-08-enterprise-managed-sandbox-in-copilot-for-jetbrains)
- [GitHub Changelog: VS Code v1.109 release notes](https://github.blog/changelog/2026-02-04-github-copilot-in-visual-studio-code-v1-109-january-release/)
