import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[20px] border border-[#dddddd] bg-white px-8 py-9 shadow-[0_2px_10px_rgba(0,0,0,0.04)]',
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = 'Card';

export { Card };
