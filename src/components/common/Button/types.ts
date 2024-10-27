export interface CommonButtonProps {
  buttonType: 'excludeTask' | 'markTask' | 'editTask';
  size?: 'small' | 'medium';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
