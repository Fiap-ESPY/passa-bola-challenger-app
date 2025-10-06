import { COLORS } from '@/theme/colors';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
`;

export const GradientBg = styled(LinearGradient)`
  flex: 1;
  overflow: hidden;
`;

export const Safe = styled(SafeAreaView)`
  flex: 1;
  padding: 16px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-left: 12px;
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 20px;
  z-index: 2;
  position: absolute;
  left: 15px;
  top: 30px;
`;

export const BackIcon = styled(FontAwesome)`
  color: ${COLORS.white};
  font-size: 24px;
  padding: 0px 2px;
`;

export const Logo = styled.Image`
  width: 140px;
  height: 140px;
  align-self: center;
  margin-top: 12px;
`;

export const Form = styled.View`
  margin-top: 24px;
  padding: 0 8px;
`;

export const InputWrapper = styled.View`
  position: relative;
  margin-bottom: 16px;
`;

export const TextInputStyled = styled.TextInput`
  height: 56px;
  border-radius: 28px;
  padding: 0 20px;
  background-color: ${COLORS.white};
  border-width: 1px;
  border-color: ${COLORS.white};
  font-size: 16px;
  color: ${COLORS.text};
`;

export const RightIconButton = styled.Pressable`
  position: absolute;
  right: 16px;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const RightIcon = styled(Feather)`
  font-size: 22px;
  color: #3a3a3a;
`;

export const ForgotLink = styled.Pressable`
  align-self: flex-start;
  margin: 2px 8px 22px;
`;

export const ForgotText = styled.Text`
  color: ${COLORS.white};
  font-weight: 800;
`;

export const PrimaryButton = styled.Pressable`
  height: 64px;
  border-radius: 32px;
  background-color: ${COLORS.black};
  align-items: center;
  justify-content: center;
  margin: 0 4px 10px;
`;

export const PrimaryText = styled.Text`
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.5px;
`;

export const DividerRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 6px 0 18px;
  padding: 0 8px;
  column-gap: 10px;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 2px;
  background-color: ${COLORS.white};
  opacity: 0.6;
  border-radius: 2px;
`;

export const DividerText = styled.Text`
  color: ${COLORS.white};
  font-weight: 800;
`;

export const SecondaryButton = styled.Pressable`
  height: 64px;
  border-radius: 32px;
  background-color: ${COLORS.gray};
  align-items: center;
  justify-content: center;
  margin: 0 4px;
`;

export const SecondaryText = styled.Text`
  color: ${COLORS.text};
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.5px;
`;