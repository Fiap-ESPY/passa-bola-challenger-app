import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.bg};
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
  margin-left: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 20px;
  z-index: 2;
`;

export const BackIcon = styled(FontAwesome)`
  color: ${COLORS.white};
  font-size: 24px;
`;

export const Section = styled.View`
  background-color: ${COLORS.white};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  elevation: 2;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000;
`;

export const SectionText = styled.Text`
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
`;

export const RuleList = styled.View``;

export const RuleItem = styled.Text`
  font-size: 13px;
  margin-bottom: 6px;
  color: #444;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 12px;
  border-top-width: 1px;
  border-color: #e1e1e1;
  background-color: ${COLORS.white};
`;

export const FooterButton = styled.TouchableOpacity`
  flex: 1;
  margin: 0px 8px 20px 0px;
  padding: 12px;
  background-color: ${COLORS.green};
  border-radius: 8px;
  align-items: center;
`;

export const FooterButtonText = styled.Text`
  font-size: 14px;
  font-weight: 800;
  color: ${COLORS.white};
`;
