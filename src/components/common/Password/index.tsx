import React, { useState, forwardRef } from 'react';
import { PasswordContent } from './styles';

const PasswordInput = forwardRef<HTMLInputElement, { placeholder: string }>(
  ({ placeholder, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <PasswordContent>
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...props}
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </PasswordContent>
    );
  }
);

export default PasswordInput;
