import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconCheck,
  IconSend,
  IconBrandWhatsapp,
  IconSchool,
  IconBuilding,
  IconSparkles,
  IconShieldCheck,
  IconClock,
  IconUsers,
  IconBolt,
  IconArrowRight,
  IconCircleCheck,
  IconMail,
  IconPhone,
  IconUser,
  IconMapPin,
  IconNotes,
} from '@tabler/icons-react';
import {
  PRODUCTS_CATALOG,
  ORG_TYPES,
  SCALE_OPTIONS,
  ADDON_MODULES,
  TIMELINE_OPTIONS,
} from '../data/productsData';
import type {
  EnquiryFormData,
  FormErrors,
  SubmissionResult,
  OrgType,
  UserScale,
  TimelineOption,
} from '../types/enquiry';
import './ProductsEnquirySection.css';

export const ProductsEnquirySection: React.FC = () => {
  const formId = useId();

  // Form State
  const [formData, setFormData] = useState<EnquiryFormData>({
    selectedProducts: ['custom-software', 'enterprise-erp'],
    orgType: 'enterprise',
    studentScale: 'medium',
    addons: ['api_sync', 'whatsapp'],
    fullName: '',
    email: '',
    phone: '',
    orgName: '',
    city: '',
    timeline: '1month',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  // Toggle product selection
  const toggleProduct = (productId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedProducts.includes(productId);
      const updated = exists
        ? prev.selectedProducts.filter((id) => id !== productId)
        : [...prev.selectedProducts, productId];
      return { ...prev, selectedProducts: updated };
    });

    if (errors.selectedProducts) {
      setErrors((prev) => ({ ...prev, selectedProducts: undefined }));
    }
  };

  // Toggle Addon
  const toggleAddon = (addonId: string) => {
    setFormData((prev) => {
      const exists = prev.addons.includes(addonId);
      const updated = exists
        ? prev.addons.filter((id) => id !== addonId)
        : [...prev.addons, addonId];
      return { ...prev, addons: updated };
    });
  };

  // Scroll to configurator
  const scrollToForm = (productId?: string) => {
    if (productId && !formData.selectedProducts.includes(productId)) {
      toggleProduct(productId);
    }
    const el = document.getElementById('enquiry-configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Form Validation
  const validateForm = (): boolean => {
    const errs: FormErrors = {};

    if (formData.selectedProducts.length === 0) {
      errs.selectedProducts = 'Please select at least one product or service';
    }

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Work/Business email is required';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone / WhatsApp number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }

    if (!formData.orgName.trim()) {
      errs.orgName = 'Company / Organization name is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      const randomRef = 'HT-' + Math.floor(100000 + Math.random() * 900000);
      const result: SubmissionResult = {
        referenceId: randomRef,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        data: { ...formData },
      };
      setIsSubmitting(false);
      setSubmissionResult(result);
    }, 1100);
  };

  // Build WhatsApp pre-filled link
  const selectedProductNames = formData.selectedProducts
    .map((id) => PRODUCTS_CATALOG.find((p) => p.id === id)?.name || id)
    .join(', ');

  const currentOrgLabel =
    ORG_TYPES.find((o) => o.id === formData.orgType)?.label || formData.orgType;
  const currentScaleLabel =
    SCALE_OPTIONS.find((s) => s.id === formData.studentScale)?.label || formData.studentScale;

  const whatsappMessage = encodeURIComponent(
    `Hello Hoducation Technologies!\n\nI would like to inquire about your software solutions.\n` +
      `• Solutions / Products: ${selectedProductNames || 'Custom Software Suite'}\n` +
      `• Organization Type: ${currentOrgLabel}\n` +
      `• Scale / Users: ${currentScaleLabel}\n` +
      `• Name: ${formData.fullName || 'Prospective Client'}\n` +
      `• Company / Org: ${formData.orgName || 'N/A'}\n\nPlease share architecture details and arrange a consultation.`
  );

  const whatsappUrl = `https://wa.me/919660034117?text=${whatsappMessage}`;

  return (
    <section className="pe-section" id="products">
      <div className="pe-container">
        {/* Section Header */}
        <div className="pe-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pe-eyebrow"
          >
            <IconSparkles size={14} />
            <span>HODUCATION SOFTWARE &amp; PRODUCTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pe-title"
          >
            Enterprise Software. <span className="pe-title-highlight">Proprietary Products.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="pe-subtitle"
          >
            Hoducation Technologies architects custom web applications, multi-branch ERPs, CRMs, and
            automated data engines — alongside our flagship proprietary products like AcadOS.
          </motion.p>
        </div>

        {/* 1. Products Cards Showcase Grid */}
        <div className="pe-products-grid">
          {PRODUCTS_CATALOG.map((product, index) => {
            const isSelected = formData.selectedProducts.includes(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`pe-product-card ${isSelected ? 'selected' : ''}`}
              >
                <div>
                  <div className="pe-card-top">
                    <div className="pe-product-icon-wrap">
                      <i className={`fa-solid ${product.icon}`}></i>
                    </div>
                    <span
                      className="pe-product-badge"
                      style={{
                        borderColor: product.badgeColor ? `${product.badgeColor}40` : undefined,
                        color: product.badgeColor || '#ffffff',
                      }}
                    >
                      {product.badge}
                    </span>
                  </div>

                  <h3 className="pe-product-name">{product.name}</h3>
                  <p className="pe-product-tagline">{product.tagline}</p>
                  <p className="pe-product-desc">{product.description}</p>

                  <div className="pe-product-metric-box">
                    <span className="pe-metric-val">{product.metrics}</span>
                    <span className="pe-metric-label">{product.metricsLabel}</span>
                  </div>

                  <ul className="pe-product-features">
                    {product.features.map((feat, idx) => (
                      <li key={idx}>
                        <i className="fa-solid fa-check"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      toggleProduct(product.id);
                      scrollToForm(product.id);
                    }}
                    className="pe-card-action-btn"
                  >
                    {isSelected ? (
                      <>
                        <IconCheck size={16} />
                        <span>Selected in Enquiry</span>
                      </>
                    ) : (
                      <>
                        <span>Add to Enquiry</span>
                        <IconArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. Interactive Configurator & Enquiry Form */}
        <div className="pe-form-wrapper" id="enquiry-configurator">
          <AnimatePresence mode="wait">
            {submissionResult ? (
              // Success Screen
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="pe-success-panel"
              >
                <div className="pe-success-icon">
                  <IconCircleCheck size={36} />
                </div>
                <h3 className="pe-success-title">Enquiry Received!</h3>
                <p className="pe-success-msg">
                  Thank you, <strong>{submissionResult.data.fullName}</strong>. Your requirement
                  profile for <strong>{submissionResult.data.orgName}</strong> has been assigned to
                  our enterprise solutions engineering team.
                </p>

                <div className="pe-ref-badge">
                  Reference ID: <strong>{submissionResult.referenceId}</strong> • Timestamp: {submissionResult.timestamp}
                </div>

                <div className="pe-success-actions">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pe-whatsapp-direct-btn"
                  >
                    <IconBrandWhatsapp size={18} />
                    <span>Continue on WhatsApp Directly</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionResult(null);
                      setFormData({
                        selectedProducts: ['acados'],
                        orgType: 'k12',
                        studentScale: 'medium',
                        addons: ['whatsapp', 'pg'],
                        fullName: '',
                        email: '',
                        phone: '',
                        orgName: '',
                        city: '',
                        timeline: '1month',
                        additionalNotes: '',
                      });
                    }}
                    className="pe-btn-reset"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              // Active Form & Live Summary Layout
              <form onSubmit={handleSubmit} noValidate>
                <div className="pe-form-grid">
                  {/* Left Column: Configurator Steps */}
                  <div className="pe-form-main">
                    {/* Step 1: Products Selector */}
                    <div className="pe-step-block">
                      <div className="pe-step-label">
                        <span className="pe-step-num">1</span>
                        <span>Select Products &amp; Solutions</span>
                      </div>
                      <h4 className="pe-step-heading">Which solutions are you interested in?</h4>

                      <div className="pe-chips-row">
                        {PRODUCTS_CATALOG.map((prod) => {
                          const active = formData.selectedProducts.includes(prod.id);
                          return (
                            <button
                              key={prod.id}
                              type="button"
                              onClick={() => toggleProduct(prod.id)}
                              className={`pe-product-chip ${active ? 'active' : ''}`}
                            >
                              {active && <IconCheck className="chip-check" size={14} />}
                              <span>{prod.name}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.selectedProducts && (
                        <span className="pe-error-text">{errors.selectedProducts}</span>
                      )}
                    </div>

                    {/* Step 2: Org Profile & Scale */}
                    <div className="pe-step-block">
                      <div className="pe-step-label">
                        <span className="pe-step-num">2</span>
                        <span>Institutional Profile &amp; Scale</span>
                      </div>
                      <h4 className="pe-step-heading">Organization Type</h4>

                      <div className="pe-org-grid">
                        {ORG_TYPES.map((org) => {
                          const active = formData.orgType === org.id;
                          return (
                            <button
                              key={org.id}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, orgType: org.id as OrgType }))
                              }
                              className={`pe-org-btn ${active ? 'active' : ''}`}
                            >
                              <i className={`fa-solid ${org.icon}`}></i>
                              <span>{org.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <h4 className="pe-step-heading" style={{ marginTop: '12px' }}>
                        Estimated Active Students / Users
                      </h4>
                      <div className="pe-scale-row">
                        {SCALE_OPTIONS.map((scale) => {
                          const active = formData.studentScale === scale.id;
                          return (
                            <button
                              key={scale.id}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  studentScale: scale.id as UserScale,
                                }))
                              }
                              className={`pe-scale-btn ${active ? 'active' : ''}`}
                            >
                              <span className="scale-title">{scale.label}</span>
                              <span className="scale-sub">{scale.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Add-on Capabilities */}
                    <div className="pe-step-block">
                      <div className="pe-step-label">
                        <span className="pe-step-num">3</span>
                        <span>Optional Modules &amp; Gateways</span>
                      </div>
                      <h4 className="pe-step-heading">Select desired capabilities</h4>

                      <div className="pe-addons-grid">
                        {ADDON_MODULES.map((addon) => {
                          const active = formData.addons.includes(addon.id);
                          return (
                            <button
                              key={addon.id}
                              type="button"
                              onClick={() => toggleAddon(addon.id)}
                              className={`pe-addon-item ${active ? 'active' : ''}`}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {active ? (
                                  <IconCircleCheck size={16} color="#34d399" />
                                ) : (
                                  <div
                                    style={{
                                      width: 14,
                                      height: 14,
                                      borderRadius: '50%',
                                      border: '1px solid rgba(255,255,255,0.3)',
                                    }}
                                  />
                                )}
                                <span>{addon.label}</span>
                              </div>
                              <span className="pe-addon-tag">{addon.tag}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 4: Contact & Timeline */}
                    <div className="pe-step-block">
                      <div className="pe-step-label">
                        <span className="pe-step-num">4</span>
                        <span>Official Contact &amp; Timeline</span>
                      </div>

                      <div className="pe-inputs-grid">
                        <div className="pe-input-group">
                          <label className="pe-label" htmlFor={`${formId}-name`}>
                            Full Name *
                          </label>
                          <div className="pe-input-wrap">
                            <IconUser className="pe-input-icon" size={16} />
                            <input
                              id={`${formId}-name`}
                              type="text"
                              placeholder="e.g. Dr. Rajesh Sharma"
                              value={formData.fullName}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                              }
                              className={`pe-input ${errors.fullName ? 'error' : ''}`}
                            />
                          </div>
                          {errors.fullName && (
                            <span className="pe-error-text">{errors.fullName}</span>
                          )}
                        </div>

                        <div className="pe-input-group">
                          <label className="pe-label" htmlFor={`${formId}-org`}>
                            Institution / Organization Name *
                          </label>
                          <div className="pe-input-wrap">
                            <IconBuilding className="pe-input-icon" size={16} />
                            <input
                              id={`${formId}-org`}
                              type="text"
                              placeholder="e.g. St. Xavier International"
                              value={formData.orgName}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, orgName: e.target.value }))
                              }
                              className={`pe-input ${errors.orgName ? 'error' : ''}`}
                            />
                          </div>
                          {errors.orgName && (
                            <span className="pe-error-text">{errors.orgName}</span>
                          )}
                        </div>

                        <div className="pe-input-group">
                          <label className="pe-label" htmlFor={`${formId}-email`}>
                            Work / Institutional Email *
                          </label>
                          <div className="pe-input-wrap">
                            <IconMail className="pe-input-icon" size={16} />
                            <input
                              id={`${formId}-email`}
                              type="email"
                              placeholder="director@institution.edu"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                              }
                              className={`pe-input ${errors.email ? 'error' : ''}`}
                            />
                          </div>
                          {errors.email && <span className="pe-error-text">{errors.email}</span>}
                        </div>

                        <div className="pe-input-group">
                          <label className="pe-label" htmlFor={`${formId}-phone`}>
                            Phone / WhatsApp Number *
                          </label>
                          <div className="pe-input-wrap">
                            <IconPhone className="pe-input-icon" size={16} />
                            <input
                              id={`${formId}-phone`}
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, phone: e.target.value }))
                              }
                              className={`pe-input ${errors.phone ? 'error' : ''}`}
                            />
                          </div>
                          {errors.phone && <span className="pe-error-text">{errors.phone}</span>}
                        </div>

                        <div className="pe-input-group">
                          <label className="pe-label" htmlFor={`${formId}-city`}>
                            City / Location
                          </label>
                          <div className="pe-input-wrap">
                            <IconMapPin className="pe-input-icon" size={16} />
                            <input
                              id={`${formId}-city`}
                              type="text"
                              placeholder="e.g. New Delhi / Bangalore"
                              value={formData.city}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, city: e.target.value }))
                              }
                              className="pe-input"
                            />
                          </div>
                        </div>

                        <div className="pe-input-group">
                          <label className="pe-label">Target Implementation Timeline</label>
                          <div className="pe-timeline-row">
                            {TIMELINE_OPTIONS.map((time) => {
                              const active = formData.timeline === time.id;
                              return (
                                <button
                                  key={time.id}
                                  type="button"
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      timeline: time.id as TimelineOption,
                                    }))
                                  }
                                  className={`pe-timeline-btn ${active ? 'active' : ''}`}
                                >
                                  {time.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="pe-input-group full-width">
                          <label className="pe-label" htmlFor={`${formId}-notes`}>
                            Specific Requirements or Custom Workflow Notes
                          </label>
                          <textarea
                            id={`${formId}-notes`}
                            rows={3}
                            placeholder="Tell us about existing legacy software, specific board requirements, number of branches, or custom integrations needed..."
                            value={formData.additionalNotes}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))
                            }
                            className="pe-input pe-textarea"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Scope & Summary Card */}
                  <div className="pe-summary-card">
                    <div className="pe-summary-header">
                      <span className="pe-summary-title">Scope &amp; Architecture Summary</span>
                      <span className="pe-summary-badge">Live Config</span>
                    </div>

                    <div className="pe-summary-list">
                      <div className="pe-summary-row">
                        <span className="pe-summary-row-label">Selected Software (s)</span>
                        {formData.selectedProducts.length > 0 ? (
                          <div className="pe-summary-products-pills">
                            {formData.selectedProducts.map((id) => {
                              const p = PRODUCTS_CATALOG.find((item) => item.id === id);
                              return (
                                <span key={id} className="pe-summary-pill">
                                  {p ? p.name : id}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="pe-summary-row-val" style={{ color: '#f87171' }}>
                            None selected (Select at least one)
                          </span>
                        )}
                      </div>

                      <div className="pe-summary-row">
                        <span className="pe-summary-row-label">Organization Profile</span>
                        <span className="pe-summary-row-val">
                          {currentOrgLabel} • {currentScaleLabel}
                        </span>
                      </div>

                      <div className="pe-summary-row">
                        <span className="pe-summary-row-label">Add-on Modules</span>
                        <span className="pe-summary-row-val">
                          {formData.addons.length > 0
                            ? `${formData.addons.length} Modules Configured`
                            : 'Standard Edition (No Addons)'}
                        </span>
                      </div>

                      <div className="pe-summary-row">
                        <span className="pe-summary-row-label">Rollout Timeline</span>
                        <span className="pe-summary-row-val">
                          {TIMELINE_OPTIONS.find((t) => t.id === formData.timeline)?.label}
                        </span>
                      </div>
                    </div>

                    <div className="pe-sla-banner">
                      <IconShieldCheck className="pe-sla-icon" size={20} />
                      <div className="pe-sla-text">
                        <strong>Hoducation Direct Engineering SLA</strong>: Guaranteed response
                        within 2 business hours with technical scope analysis.
                      </div>
                    </div>

                    <div className="pe-direct-support-box">
                      <span className="pe-direct-support-title">DIRECT CONTACT SUPPORT</span>
                      <div className="pe-direct-support-row">
                        <IconPhone size={14} className="pe-direct-icon-phone" />
                        <span className="pe-direct-label">Hotline:</span>
                        <a href="tel:+919660034117" className="pe-direct-val">+91 9660034117</a>
                      </div>
                      <div className="pe-direct-support-row">
                        <IconMail size={14} className="pe-direct-icon-mail" />
                        <span className="pe-direct-label">E-mail:</span>
                        <a href="mailto:hoducationtechnologies@gmail.com" className="pe-direct-val">hoducationtechnologies@gmail.com</a>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="pe-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div
                            style={{
                              width: 16,
                              height: 16,
                              border: '2px solid #000',
                              borderTopColor: 'transparent',
                              borderRadius: '50%',
                              animation: 'spin 0.8s linear infinite',
                            }}
                          />
                          <span>Dispatching Scope...</span>
                        </>
                      ) : (
                        <>
                          <IconSend size={16} />
                          <span>Submit Official Product Enquiry</span>
                        </>
                      )}
                    </motion.button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pe-whatsapp-direct-btn"
                    >
                      <IconBrandWhatsapp size={18} />
                      <span>Instant Connect via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProductsEnquirySection;
