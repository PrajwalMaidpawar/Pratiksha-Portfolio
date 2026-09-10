/**
 * Contact Section (Phase 7 Implementation)
 * Target Section ID: #contact
 * Features:
 * - Editorial headline: LET'S CREATE SOMETHING PEOPLE REMEMBER.
 * - Split composition: Contact Details & Channels on the left, Luxury Minimal Inquiry Form on the right
 * - Client-side validation with real server-side API integration (/api/contact)
 * - Final cinematic visual moment (@SEE.AWKWARDS) transitioning smoothly into the footer
 */

import Container from '../components/Container';
import Section from '../components/Section';
import ContactHeader from '../components/contact/ContactHeader';
import ContactDetails from '../components/contact/ContactDetails';
import ContactForm from '../components/contact/ContactForm';
import ContactCTA from '../components/contact/ContactCTA';

export default function Contact() {
  return (
    <Section id="contact" className="relative overflow-hidden py-16 lg:py-24" hasDivider={true}>
      <Container>
        <div className="space-y-16 lg:space-y-24">
          {/* Section Header with Staggered Typography Reveal */}
          <ContactHeader />

          {/* Editorial 2-Column Grid (Desktop >= 1024px) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column (Cols 1–5): Direct Channels, Status, Details */}
            <div className="lg:col-span-5">
              <ContactDetails />
            </div>

            {/* Right Column (Cols 6–12): Luxury Underline Inquiry Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* Final Cinematic Visual Moment & Instagram Transition */}
          <ContactCTA />
        </div>
      </Container>
    </Section>
  );
}
