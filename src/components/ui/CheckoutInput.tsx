import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const CheckoutInput = React.forwardRef<HTMLInputElement, Props>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`w-full bg-white border-2 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all duration-200
            ${error ? 'border-red-500 shadow-sm shadow-red-50' : 'border-gray-100 focus:border-[#800020] focus:shadow-lg focus:shadow-brand-100'} 
            ${props.readOnly ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-100' : ''} 
            ${className}`}
          {...props}
        />
        {error && (
          <p className="text-[10px] text-red-500 font-bold uppercase mt-1.5 ml-1 tracking-widest leading-none">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CheckoutInput.displayName = "CheckoutInput";