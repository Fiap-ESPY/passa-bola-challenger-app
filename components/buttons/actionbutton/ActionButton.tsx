import { ReactNode } from 'react';
import { ButtonContainer, ButtonText, IconWrapper } from './styles';

type ActionButtonProps = {
  isDisabled?: boolean;
  onPress: () => void;
  label: string;
  icon?: ReactNode;
  backgroundColor?: string;
};

const ActionButton = ({
  isDisabled = false,
  onPress,
  label,
  icon,
  backgroundColor,
}: ActionButtonProps) => {
  return (
    <ButtonContainer
      isDisabled={isDisabled}
      onPress={onPress}
      backgroundColor={backgroundColor}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  );
};

export default ActionButton;
