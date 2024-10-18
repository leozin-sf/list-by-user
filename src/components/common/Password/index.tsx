import React, { useState, forwardRef } from 'react';
import { PasswordContent } from './styles';
import { PasswordTypes } from './types';

const PasswordInput = forwardRef<HTMLInputElement, PasswordTypes>(
  ({ placeholder, className, onEnterPress, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <PasswordContent>
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={className}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onEnterPress) {
              onEnterPress(e);
            }
          }}
          {...props}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </PasswordContent>
    );
  }
);

export default PasswordInput;
