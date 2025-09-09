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

export const SearchIcon = styled(FontAwesome)`
  color: ${COLORS.grayMedium};
`;

export const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  background-color: #f6f6f6;
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 12px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: ${COLORS.text};
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
