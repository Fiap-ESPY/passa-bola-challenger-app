import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: ${COLORS.bg};
`;

export const HeaderGrad = styled(ImageBackground)`
  height: 220px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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
`;

export const HeaderCard = styled.View`
  background-color: ${COLORS.white};
  margin-top: -28px; /* sobe sobre o gradiente */
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

export const Tabs = styled.View`
  flex-direction: row;
  column-gap: 8px;
  justify-content: center;
`;

export const TabPill = styled.Pressable<{ $active?: boolean }>`
  padding: 8px 14px;
  border-radius: 20px;
  background-color: ${({ $active }) =>
    $active ? COLORS.pillActive : COLORS.pill};
`;

export const TabText = styled.Text<{ $active?: boolean }>`
  font-weight: 700;
  color: ${({ $active }) => ($active ? COLORS.text : '#7A7A7A')};
`;

export const CardWrapper = styled.View`
  margin-top: 14px;
`;

export const FeaturedCard = styled.TouchableOpacity`
  margin-top: 8px;
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${COLORS.white};
  /* sombra iOS */
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  /* sombra Android */
  elevation: 2;
`;

export const FeaturedImage = styled.ImageBackground`
  height: 180px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
`;

export const FeaturedOverlay = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const FeaturedBadge = styled.View`
  position: absolute;
  top: 10px;
  left: 12px;
  background-color: ${COLORS.tagBg};
  padding: 6px 10px;
  border-radius: 16px;
`;

export const FeaturedBadgeText = styled.Text`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: ${COLORS.tagText};
`;

export const FeaturedTitle = styled.Text`
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 18px;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;

  width: 76px;
  height: 76px;
  border-radius: 100%;

  align-items: center;
  justify-content: center;

  background-color: ${COLORS.blue};

  /* sombra iOS */
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;

  /* sombra Android */
  elevation: 6;
`;