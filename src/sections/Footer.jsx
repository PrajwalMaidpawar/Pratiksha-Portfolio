/**
 * Footer Section (Phase 7 Architecture)
 * Re-exports/renders ContactFooter to preserve backward compatibility and root structure.
 */

import ContactFooter from '../components/contact/ContactFooter';

export default function Footer() {
  return <ContactFooter />;
}
