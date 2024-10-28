import React, { useState, forwardRef } from 'react';
import { PasswordContent, ButtonShowHide } from './styles';
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
        <ButtonShowHide
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          isActive={showPassword}
        />
      </PasswordContent>
    );
  }
);

export default PasswordInput;
