import * as React from 'react';
import { cn } from '@/lib/utils';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, type = 'button', ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'flex w-full items-center justify-center rounded-lg border border-orange-500 bg-orange-500 px-6 py-3 text-base font-medium text-white transition active:scale-[0.99] hover:border-orange-600 hover:bg-orange-600 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };
