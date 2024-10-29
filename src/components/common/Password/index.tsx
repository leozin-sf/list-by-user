import React, { useState, forwardRef } from 'react';
import { PasswordContent, ButtonShowHide } from './styles';
import { PasswordTypes } from './types';

const PasswordInput = forwardRef<HTMLInputElement, PasswordTypes>(
  ({ placeholder, className, onEnterPress, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleToggleShowPassword = () => {
      setShowPassword(!showPassword);

      if (ref && typeof ref !== 'function' && ref.current) {
        const input = ref.current;
        input.focus();

        const length = input.value.length;
        setTimeout(() => input.setSelectionRange(length, length), 0);
      }
    };

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
          disabled={disabled}
          {...props}
        />
        <ButtonShowHide
          type="button"
          onClick={handleToggleShowPassword}
          isActive={showPassword}
        />
      </PasswordContent>
    );
  }
);

export default PasswordInput;
