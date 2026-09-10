/**
 * Section Component
 * Semantic HTML section with standardized vertical spacing rhythm,
 * accessible section landmark, and scroll margin alignment for fixed navigation.
 */

export default function Section({
  id,
  children,
  className = '',
  hasDivider = false,
  padded = true,
  ...props
}) {
  return (
    <section
      id={id}
      aria-label={id}
      className={`relative w-full overflow-hidden ${
        padded ? 'py-16 sm:py-20 md:py-24 lg:py-32' : ''
      } ${className}`}
      {...props}
    >
      {hasDivider && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2C2A35] to-transparent"
        />
      )}
      {children}
    </section>
  );
}
