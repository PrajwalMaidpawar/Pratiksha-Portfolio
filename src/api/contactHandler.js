/**
 * Server-Side Contact Inquiry Handler (Phase 9: Production Setup)
 * Handles POST /api/contact requests with:
 * - Anti-spam honeypot filtering
 * - Strict server-side validation & field length bounds
 * - In-memory flood protection / rate limiting
 * - Configurable email delivery via Resend (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)
 * - Safe error handling (never exposes internal error traces or secrets)
 *
 * Security: Private server module — never bundled into client React assets.
 */

// In-memory store for audit logs during server lifecycle
const receivedInquiries = [];

// In-memory flood protection (5 submissions per 10 minutes per email or identifier)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;

function isRateLimited(identifier) {
  if (!identifier) return false;
  const now = Date.now();
  const history = rateLimitMap.get(identifier) || [];
  const validTimestamps = history.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    rateLimitMap.set(identifier, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(identifier, validTimestamps);
  return false;
}

export async function handleContactInquiry(reqBody, clientIp = '') {
  // 1. Check for malformed payload
  if (!reqBody || typeof reqBody !== 'object' || Array.isArray(reqBody)) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Invalid request payload.',
      },
    };
  }

  const { name, brand, email, projectType, message, website, _gotcha, honeypot } = reqBody;

  // 2. Honeypot check for spam bots
  // Hidden fields must be empty. If filled, silently acknowledge without processing.
  if (website || _gotcha || honeypot) {
    console.log('🛡️ [Spam Bot Blocked]: Honeypot field was filled.');
    return {
      status: 200,
      data: {
        success: true,
        message: "Thank you. Your inquiry has been sent. We'll get back to you soon.",
      },
    };
  }

  // 3. Strict field validation & length bounds
  if (!name || typeof name !== 'string' || !name.trim()) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Please enter your name.',
      },
    };
  }
  if (name.trim().length > 100) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Name must be 100 characters or fewer.',
      },
    };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const cleanEmail = email && typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Please enter a valid email address.',
      },
    };
  }
  if (cleanEmail.length > 120) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Email must be 120 characters or fewer.',
      },
    };
  }

  if (brand && typeof brand === 'string' && brand.trim().length > 100) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Brand name must be 100 characters or fewer.',
      },
    };
  }

  if (projectType && typeof projectType === 'string' && projectType.trim().length > 80) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Project type must be 80 characters or fewer.',
      },
    };
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Tell us a little about the project.',
      },
    };
  }
  if (message.trim().length < 5) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Message is too short. Please provide a few more details.',
      },
    };
  }
  if (message.trim().length > 3000) {
    return {
      status: 400,
      data: {
        success: false,
        error: 'Message must be 3,000 characters or fewer.',
      },
    };
  }

  // 4. Rate limiting check
  const rateLimitId = cleanEmail || clientIp || 'anonymous';
  if (isRateLimited(rateLimitId)) {
    return {
      status: 429,
      data: {
        success: false,
        error: 'Too many requests. Please wait a few minutes before submitting again.',
      },
    };
  }

  // 5. Construct sanitized inquiry
  const sanitizedInquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    brand: brand && typeof brand === 'string' && brand.trim() ? brand.trim() : 'Not Specified',
    email: cleanEmail,
    projectType: projectType && typeof projectType === 'string' && projectType.trim() ? projectType.trim() : 'General Collaboration',
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  // 6. Server-side audit logging
  receivedInquiries.push(sanitizedInquiry);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📥 [NEW COLLABORATION INQUIRY RECEIVED]');
  console.log(`ID:           ${sanitizedInquiry.id}`);
  console.log(`From:         ${sanitizedInquiry.name} (${sanitizedInquiry.email})`);
  console.log(`Brand/Agency: ${sanitizedInquiry.brand}`);
  console.log(`Format:       ${sanitizedInquiry.projectType}`);
  console.log(`Timestamp:    ${sanitizedInquiry.createdAt}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // 7. Live email forwarding via Resend if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Inquiries <onboarding@resend.dev>';
  // Resend sandbox (onboarding@resend.dev) restricts delivery exclusively to the account owner's email.
  const isSandbox = contactFromEmail.includes('resend.dev');
  const defaultRecipient = isSandbox ? 'praju9307183730@gmail.com' : 'officialpratiksha26@gmail.com';
  const targetRecipient = process.env.CONTACT_TO_EMAIL || defaultRecipient;

  if (resendApiKey) {
    try {
      const emailPayload = (toAddress) => ({
        from: contactFromEmail,
        to: [toAddress],
        reply_to: sanitizedInquiry.email,
        subject: `[New Inquiry] ${sanitizedInquiry.name} - ${sanitizedInquiry.projectType}`,
        text: `You received a new collaboration inquiry from your portfolio:

Name: ${sanitizedInquiry.name}
Brand/Company: ${sanitizedInquiry.brand}
Email: ${sanitizedInquiry.email}
Project Type: ${sanitizedInquiry.projectType}
Received At: ${sanitizedInquiry.createdAt}

Message:
${sanitizedInquiry.message}
`,
      });

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify(emailPayload(targetRecipient)),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '' }));
        const errorMessage = errorData.message || '';

        // If Resend restricted sending because a domain isn't verified yet, auto-retry to the verified account owner email
        const match = errorMessage.match(/own email address \(([^)]+)\)/i);
        if (match && match[1] && match[1] !== targetRecipient) {
          const verifiedOwnerEmail = match[1];
          console.log(`ℹ️ [Resend Sandbox]: Retrying delivery to verified account (${verifiedOwnerEmail})...`);
          const retryRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify(emailPayload(verifiedOwnerEmail)),
          });

          if (retryRes.ok) {
            console.log(`✉️ [Resend Email Dispatched Successfully] Delivered to ${verifiedOwnerEmail}`);
          } else {
            console.warn('⚠️ [Resend Sandbox Dispatch]: Could not complete email dispatch.', await retryRes.text());
          }
        } else {
          console.warn('⚠️ [Resend Notice]:', errorMessage || 'Domain verification required for external recipients.');
        }
      } else {
        console.log(`✉️ [Resend Email Dispatched Successfully] Delivered to ${targetRecipient}`);
      }
    } catch (err) {
      // Log on server only — do not reveal internal network details to visitor
      console.error('❌ [Email Dispatch Network Error]:', err?.message || 'Unknown network error');
    }
  } else {
    console.log('ℹ️ [Email Dispatch Note]: RESEND_API_KEY is not set. Inquiry saved in memory & server logs.');
  }

  // 8. Return success response
  return {
    status: 200,
    data: {
      success: true,
      message: "Thank you. Your inquiry has been sent. We'll get back to you soon.",
      inquiryId: sanitizedInquiry.id,
    },
  };
}

export function getInquiries() {
  return receivedInquiries;
}
