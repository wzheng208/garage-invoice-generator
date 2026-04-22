import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = 'button', variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'flex w-full items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50',
          variant === 'primary' &&
            'border border-orange-500 bg-orange-500 text-white hover:border-orange-600 hover:bg-orange-600',
          variant === 'secondary' &&
            'border border-[#d8dbe1] bg-white text-[#171a20] hover:bg-[#f8f8f8]',
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
