'use client';

import React, { useState } from 'react';

export default function PricingTableDemo() {
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      monthly: 0,
      yearly: 0,
      desc: 'Essential patterns for independent developers building prototypes.',
      features: ['5 Open-Source AI Repositories', 'Standard Vector Search', 'Community Discord Support', '1 Team Seat'],
      cta: 'Free Tier',
    },
    {
      id: 'pro',
      name: 'Professional',
      monthly: 29,
      yearly: 24,
      popular: true,
      desc: 'Production architecture for fast-growing engineering teams.',
      features: ['Unlimited Repositories', 'Sub-10ms Hybrid RAG Engine', 'Priority SLA Support (4h)', '5 Team Seats', 'Custom CSS Tokens Export'],
      cta: 'Start 14-Day Trial',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthly: 99,
      yearly: 79,
      desc: 'Dedicated infrastructure, custom model tuning, and SOC2 compliance.',
      features: ['Dedicated Edge VPC Clusters', 'Custom LLM Quantization', '24/7 Dedicated Support Engineer', 'Unlimited Seats', 'Custom MSA & Invoicing'],
      cta: 'Contact Sales',
    },
  ];

  return (
    <div style={{ width: '100%', padding: '20px 10px' }}>
      {/* Billing Frequency Switch */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <div
          role="radiogroup"
          aria-label="Billing frequency selection"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#f1f5f9',
            padding: '4px',
            borderRadius: '99px',
          }}
        >
          <button
            type="button"
            onClick={() => setIsYearly(false)}
            role="radio"
            aria-checked={!isYearly}
            style={{
              background: !isYearly ? '#ffffff' : 'none',
              color: !isYearly ? '#0f172a' : '#64748b',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '99px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: !isYearly ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setIsYearly(true)}
            role="radio"
            aria-checked={isYearly}
            style={{
              background: isYearly ? '#ffffff' : 'none',
              color: isYearly ? '#0f172a' : '#64748b',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '99px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: isYearly ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Yearly
            <span
              style={{
                fontSize: '10.5px',
                background: '#dbeafe',
                color: '#1e40af',
                padding: '2px 8px',
                borderRadius: '99px',
                fontWeight: 700,
              }}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          maxWidth: '940px',
          margin: '0 auto',
        }}
      >
        {plans.map(plan => {
          const price = isYearly ? plan.yearly : plan.monthly;
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              style={{
                position: 'relative',
                background: '#ffffff',
                border: plan.popular ? '2px solid #2563eb' : '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '28px 22px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: plan.popular ? '0 10px 30px rgba(37, 99, 235, 0.1)' : '0 2px 8px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              {plan.popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#2563eb',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 12px',
                    borderRadius: '99px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Most Popular
                </span>
              )}

              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                {plan.name}
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 16px', minHeight: '36px', lineHeight: 1.4 }}>
                {plan.desc}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>$</span>
                <span style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                  {price}
                </span>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>/ month</span>
              </div>

              <button
                type="button"
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isSelected ? '#0f172a' : plan.popular ? '#2563eb' : '#f8fafc',
                  color: isSelected || plan.popular ? '#ffffff' : '#0f172a',
                  borderWidth: isSelected || plan.popular ? 0 : '1px',
                  borderStyle: 'solid',
                  borderColor: '#cbd5e1',
                  transition: 'all 0.15s ease',
                }}
              >
                {isSelected ? '✓ Selected' : plan.cta}
              </button>

              <ul style={{ listStyle: 'none', padding: 0, margin: '22px 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#16a34a" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
