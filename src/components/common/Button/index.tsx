import { Content } from './styles';
import { CommonButtonProps } from './types';

export const Button: React.FC<CommonButtonProps> = ({
  buttonType,
  size = 'small',
  onClick,
  disabled,
  children,
}) => (
  <Content
    buttonType={buttonType}
    size={size}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </Content>
);
