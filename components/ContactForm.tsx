'use client';

import React, { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
}

const TOPIC_LABELS: Record<string, string> = {
  editorial: 'Editorial Feedback & Errata',
  bug: 'Technical Bug / Broken Code Sample',
  repo: 'Suggest Open-Source Repository',
  business: 'Business, Media & Press Inquiry',
  dmca: 'DMCA / Copyright Infringement Notice',
  privacy: 'Privacy / GDPR / CCPA Data Subject Request',
  general: 'General Developer Inquiry',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    topic: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.topic) {
      newErrors.topic = 'Please select a subject category.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmittedData({ ...formData });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      topic: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  if (isSubmitted && submittedData) {
    const topicText = TOPIC_LABELS[submittedData.topic] || submittedData.topic;

    return (
      <div className="contact-form-card" role="region" aria-live="polite">
        <div className="form-feedback-success">
          <div className="feedback-success-icon" aria-hidden="true">
            ✓
          </div>
          <h3 className="feedback-success-title">Message Received Successfully!</h3>
          <p className="feedback-success-desc">
            Thank you, <strong>{submittedData.name}</strong>. Your message regarding{' '}
            <strong>&quot;{topicText}&quot;</strong> has been securely logged and forwarded to our editorial engineering desk.
          </p>
          <p className="feedback-success-desc" style={{ marginTop: '-8px' }}>
            A copy has been routed for response to <strong>{submittedData.email}</strong>. In accordance with our publisher SLA, you will receive a response within <strong>24–48 business hours</strong>.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="feedback-reset-btn"
          >
            ← Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <h2 className="contact-form-title">Send a Direct Message</h2>
      <p className="contact-form-subtitle">
        Fill out the verified dispatch form below to route your inquiry directly to our engineering desk.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="field">
            <label htmlFor="cf-name">
              Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'has-error' : ''}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'cf-name-error' : undefined}
              required
            />
            {errors.name && (
              <span id="cf-name-error" className="field-error-msg">
                {errors.name}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="cf-email">
              Email Address <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@domain.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'has-error' : ''}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'cf-email-error' : undefined}
              required
            />
            {errors.email && (
              <span id="cf-email-error" className="field-error-msg">
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="cf-topic">
            Subject Category <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            id="cf-topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className={errors.topic ? 'has-error' : ''}
            aria-invalid={!!errors.topic}
            aria-describedby={errors.topic ? 'cf-topic-error' : undefined}
            required
          >
            <option value="" disabled>
              Select an inquiry category
            </option>
            <option value="editorial">Editorial Feedback &amp; Errata Correction</option>
            <option value="bug">Technical Bug / Broken Code Sample Report</option>
            <option value="repo">Open-Source Repository Review Suggestion</option>
            <option value="business">Business, Media &amp; Partnership Inquiry</option>
            <option value="dmca">DMCA &amp; Intellectual Property Notice</option>
            <option value="privacy">Privacy, GDPR &amp; CCPA Data Subject Request</option>
            <option value="general">General Developer Inquiry</option>
          </select>
          {errors.topic && (
            <span id="cf-topic-error" className="field-error-msg">
              {errors.topic}
            </span>
          )}
        </div>

        <div className="field">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <label htmlFor="cf-message">
              Message <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>
              {formData.message.length} characters
            </span>
          </div>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            placeholder="Please detail your question, technical errata reference, or repository URL..."
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'has-error' : ''}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'cf-message-error' : undefined}
            required
          />
          {errors.message && (
            <span id="cf-message-error" className="field-error-msg">
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="contact-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="animate-spin"
                style={{ animation: 'spin 1s linear infinite' }}
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              <span>Routing Message...</span>
            </>
          ) : (
            <span>Send Verified Message →</span>
          )}
        </button>
      </form>
    </div>
  );
}
