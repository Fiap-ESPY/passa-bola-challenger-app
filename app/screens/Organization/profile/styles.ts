import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
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
  margin-left: 25px;
  margin-top: 10px;
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
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 12px;
  font-weight: 600;
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

export const DateText = styled.Text`
  font-size: 12px;
  color: ${COLORS.grayMedium};
  text-align: right;
`;

export const HeaderGrad = styled(ImageBackground)`
  height: 220px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 140px;
`;

export const HeaderCard = styled.View`
  background-color: ${COLORS.white};
  align-self: center;
  width: 90%;
  border-radius: 16px;
  padding: 16px;
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.08;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 3;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: ${COLORS.text};
  align-self: center;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

export const CardWrapper = styled.View`
  gap: 30px;
`;

export const HeaderActions = styled.View`
  position: absolute;
  top: 70px;
  right: 20px;
  z-index: 2;
  flex-direction: row;
`;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.35);

  /* sombra iOS */
  shadow-color: #000;
  shadow-opacity: 0.12;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;

  /* sombra Android */
  elevation: 3;
`;

export const LogoutText = styled.Text`
  color: ${COLORS.white};
  font-weight: 700;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.text}; 
`;

export const Value = styled.Text`
  font-size: 16px;
  color: ${COLORS.text};
  margin-left: 8px;
`;

export const PlayerListItem = styled.Text`
  font-size: 16px;
  color: ${COLORS.text};
  margin-left: 8px;
  line-height: 24px;
`;

export const TeamLogoImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 1px;
  border-color: #4A5568;
`;

export const PlayerRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: ${COLORS.blueLight};
  border-radius: 10px;
  margin: 5px 0px;
`;

export const PlayerPhotoImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

export const PlayerName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.text};
`;