interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  faqs,
}: FAQSectionProps) {
  return (
    <section aria-label="Frequently Asked Questions" className="faq-section" style={{ marginTop: '40px', marginBottom: '32px' }}>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '6px',
              padding: '16px 20px',
            }}
          >
            <h3 style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {faq.question}
            </h3>
            <p style={{ margin: 0, color: 'var(--text-secondary, #475569)', lineHeight: '1.6', fontSize: '0.92rem' }}>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
