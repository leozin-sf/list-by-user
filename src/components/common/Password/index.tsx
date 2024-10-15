import React, { useState } from 'react';

import { PasswordContent } from './styles';

const PasswordInput = ({ placeholder, ...props }: { placeholder: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PasswordContent>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...props}
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </PasswordContent>
  );
};

export default PasswordInput;
