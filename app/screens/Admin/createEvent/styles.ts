import { COLORS } from '@/theme/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: ${COLORS.bg};
`;

export const Title = styled.Text`
  font-size: 23px;
  font-weight: 700;
  color: ${COLORS.text};
  margin-vertical: 25px;
  text-align: center;
`;

export const HeaderGradient = styled(LinearGradient)`
  height: 140px;
  padding: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  text-align: center;
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 18px;
`;

export const HeaderSpacer = styled.View`
  width: 40px;
  height: 40px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-left: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 20px;
  z-index: 2;
`;

export const BackIcon = styled(FontAwesome)`
  color: ${COLORS.white};
  font-size: 24px;
  padding: 0px 2px;
`;

export const Form = styled.View`
  gap: 14px;
  padding-top: 16px;
`;

export const Label = styled.Text`
  color: ${COLORS.text};
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 6px;
`;

export const Input = styled.TextInput`
  background-color: ${COLORS.white};
  border: 1px solid #E6E6E6;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 16px;
  color: ${COLORS.black};

  /* sombra leve iOS */
  shadow-color: #000;
  shadow-opacity: 0.03;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;

  /* Android */
  elevation: 1;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Segmented = styled.View`
  flex-direction: row;
  background-color: ${COLORS.bg || '#F2F4F7'};
  padding: 4px;
  border-radius: 12px;
  gap: 6px;
`;

export const Segment = styled.TouchableOpacity<{ $active?: boolean }>`
  flex: 1;
  padding: 10px 12px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $active }) => ($active ? COLORS.blue : 'transparent')};
`;

export const SegmentText = styled.Text<{ $active?: boolean }>`
  font-weight: 700;
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.text)};
`;

export const SwitchRow = styled.View`
  margin-top: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SwitchLabel = styled.Text`
  color: ${COLORS.text};
  font-size: 14px;
  flex: 1;
  padding-right: 8px;
`;

export const SubmitButton = styled.TouchableOpacity`
  margin-top: 6px;
  background-color: ${COLORS.blue};
  border-radius: 14px;
  padding: 14px;
  align-items: center;

  /* sombra iOS */
  shadow-color: #000;
  shadow-opacity: 0.12;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;

  /* Android */
  elevation: 3;
`;

export const SubmitText = styled.Text`
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 16px;
`;

export const ErrorText = styled.Text`
  color: ${COLORS.red || '#D92D20'};
  font-size: 13px;
  margin-top: 2px;
`;

export const InputPressable = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.tagText || '#E6E6E6'};
  border-radius: 12px;
  padding: 12px 14px;

  /* sombra leve iOS */
  shadow-color: #000;
  shadow-opacity: 0.03;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;

  /* Android */
  elevation: 1;
`;

export const InlineRow = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const InputIcon = styled(FontAwesome).attrs({
  size: 16,
  color: COLORS.sub || '#667085',
})``;

export const InputValue = styled.Text`
  flex: 1;
  color: ${COLORS.text};
  font-size: 16px;
`;
