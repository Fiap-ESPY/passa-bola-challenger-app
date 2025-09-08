import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

export const Screen = styled.SafeAreaView`
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

/** FEATURED **/
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
  left: 0; right: 0; top: 0; bottom: 0;
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

export const FeaturedAvatar = styled.View`
  position: absolute;
  top: 10px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background-color: #3b82f6; /* azul do mock */
`;

export const FeaturedAvatarText = styled.Text`
  color: white;
  font-weight: 800;
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

/** LISTA **/
export const NewsItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  border-radius: 16px;
  background-color: ${COLORS.white};
  margin-bottom: 12px;

  /* sombra iOS */
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  /* sombra Android */
  elevation: 1;
`;

export const NewsThumb = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 10px;
  margin-right: 12px;
`;

export const NewsInfo = styled.View`
  flex: 1;
`;

export const NewsMetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const NewsPill = styled.Text`
  background-color: ${COLORS.tagBg};
  color: ${COLORS.tagText};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
`;

export const NewsMetaDivider = styled.View`
  height: 6px;
  flex: 1;
  margin-left: 8px;
  border-radius: 3px;
  background-color: ${COLORS.grayLight ?? '#e6e6e6'};
`;

export const NewsTitle = styled.Text`
  color: ${COLORS.text};
  font-weight: 800;
  font-size: 13px;
  margin-bottom: 4px;
`;

export const NewsExcerpt = styled.Text`
  color: ${COLORS.sub};
  font-size: 12px;
  line-height: 16px;
`;
