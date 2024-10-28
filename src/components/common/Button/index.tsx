import React from 'react';
import { ExcludeButton, MarkTaskButton, EditTask, DoneBg } from './styles';
import { CommonButtonProps } from './types';

export const Button: React.FC<CommonButtonProps> = ({
  buttonType,
  size = 'small',
  onClick,
  disabled,
  task_confirmed = false,
}) => {
  const ButtonComponent =
    buttonType === 'excludeTask'
      ? ExcludeButton
      : buttonType === 'markTask'
        ? MarkTaskButton
        : EditTask;

  return buttonType === 'markTask' ? (
    <DoneBg task_confirmed={task_confirmed} disabled={disabled}>
      <ButtonComponent
        buttonType={buttonType}
        size={size}
        onClick={onClick}
        disabled={disabled}
        task_confirmed={task_confirmed}
      />
    </DoneBg>
  ) : (
    <ButtonComponent
      buttonType={buttonType}
      size={size}
      onClick={onClick}
      disabled={disabled}
    />
  );
};
