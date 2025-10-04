import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
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

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 50px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.tagText};
  text-align: center; 
  width: 230px;
  margin-top: 12px;
  opacity: 0.7; 
`;

export const EmptyChampionshipSVG = styled.Image`
  width: 220px;
  height: 220px;
  opacity: 0.7; 
`;