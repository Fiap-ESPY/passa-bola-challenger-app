import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
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

export const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

export const BackIcon = styled(FontAwesome)`
  color: ${COLORS.white};
  font-size: 20px;
  margin-top: 20px;
`;
