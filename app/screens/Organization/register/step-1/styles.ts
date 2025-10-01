import { COLORS } from '@/theme/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  
`;

export const Safe = styled.SafeAreaView`
  flex: 1;  
  width: 85%;
`;

export const GradientBg = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  align-self: center;
`;

export const Form = styled.View`
  width: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  align-self: center;
`;

export const InputWrapper = styled.View<{ width?: string }>`
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.white};
  border-radius: 8px;
  height: 40px;
  margin-bottom: 15px;
  padding-horizontal: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
  width: ${({ width }) => width || '100%'};
`;

export const TextInputStyled = styled.TextInput`
  flex: 1;
  color: ${COLORS.black};
  font-size: 14px;
  padding: 10px;
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
  font-size: 18px;
  font-weight: bold;
`;

export const BackButton = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 20px;
  z-index: 2;
  position: absolute;
  left: 0px;
  top: 80px;
`;

export const BackIcon = styled(FontAwesome)`
  color: ${COLORS.white};
  font-size: 24px;
  padding: 0px 2px;
`;

export const StepsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
  max-width: 250px;
  align-self: center;
`;

export const StepCircle = styled.TouchableOpacity<{ active: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => (props.active ? COLORS.black : 'rgba(255, 255, 255, 0.3)')};
  border: 2px solid ${props => (props.active ? COLORS.white : 'rgba(255, 255, 255, 0.5)')};
  align-items: center;
  justify-content: center;
`;

export const StepText = styled.Text<{ active: boolean }>`
  color: ${props => (props.active ? COLORS.white : 'rgba(255, 255, 255, 0.7)')};
  font-size: 16px;
  font-weight: bold;
`;

export const StepLine = styled.View<{ active: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${props => (props.active ? COLORS.black : 'rgba(255, 255, 255, 0.5)')};
  margin-horizontal: 5px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
