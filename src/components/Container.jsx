/**
 * Container Component
 * Centralized responsive container wrapper enforcing max-width and consistent horizontal gutters.
 */

export default function Container({ children, className = '', size = 'default', ...props }) {
  const maxSizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-[1320px]',
    wide: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${maxSizes[size] || maxSizes.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
