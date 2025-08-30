import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'small' | 'large';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, size = 'default', ...props }, ref) => {
    const sizeClasses = {
      small: 'max-w-3xl',
      default: 'max-w-5xl',
      large: 'max-w-7xl',
    };

    return (
      <div
        ref={ref}
        className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export { Container };