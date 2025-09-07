import { ButtonContainer, ButtonText } from './styles';

type ActionButtonProps = {
  isDisabled?: boolean;
  onPress: () => void;
  label: string;
};

const ActionButton = ({
  isDisabled = false,
  onPress,
  label,
}: ActionButtonProps) => {
  return (
    <ButtonContainer isDisabled={isDisabled} onPress={onPress}>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  );
};

export default ActionButton;
