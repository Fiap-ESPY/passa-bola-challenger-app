import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.bg};
`;

export const HeaderImage = styled.ImageBackground`
  width: 100%;
  height: 260px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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
  font-size: 22px;
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: 10px;
`;

export const SectionSubtitle = styled.Text`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 12px;
`;

export const SectionText = styled.Text`
  font-size: 15px;
  color: ${COLORS.darkCharcoal};
  line-height: 22px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${COLORS.lightGray};
  margin: 16px 0;
`;

export const SourceText = styled.Text`
  font-size: 12px;
  color: ${COLORS.grayMedium};
  text-align: right;
  margin-top: 30px;
`;