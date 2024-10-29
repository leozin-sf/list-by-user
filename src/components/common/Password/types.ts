export type PasswordTypes = {
  placeholder: string;
  className?: string;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};
