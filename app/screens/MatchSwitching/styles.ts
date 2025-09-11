import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Screen = styled.View`
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

export const SectionTitle = styled.Text`
  margin: 35px 0 15px;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  color: ${COLORS.text};
  letter-spacing: 0.5px;
`;

export const Section = styled.View`
  row-gap: 12px;
`;

// Card do confronto
export const MatchCard = styled.View`
  background-color: ${COLORS.white};
  border-radius: 16px;
  padding: 14px;
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

export const Badge = styled.View`
  align-self: flex-start;
  background-color: #f1f1f3;
  padding: 4px 10px;
  border-radius: 12px;
  margin-bottom: 10px;
`;

export const BadgeText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: #6c6c6c;
`;

export const MatchRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Side = styled.View`
  width: 42%;
  align-items: center;
  row-gap: 6px;
`;

export const TeamCircle = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #f3f3f7;
  align-items: center;
  justify-content: center;
`;

export const TeamLogo = styled.Image`
  width: 44px;
  height: 44px;
`;

export const TeamName = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${COLORS.text};
`;

export const VsImage = styled.Image`
  width: 25px;
  height: 25px;
`;

export const WinnerTitle = styled.Text`
  margin: 0px 0 12px;
  text-align: center;
  font-size: 22px;
  font-weight: 900;
  color: ${COLORS.text};
  letter-spacing: 0.5px;
`;

export const WinnerCard = styled(LinearGradient)`
  height: 170px;
  border-radius: 28px;
  padding: 16px;
  justify-content: center;
  align-items: center;

  /* sombra leve como no restante dos cards */
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.08;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 3;
`;

export const WinnerContent = styled.View`
  align-items: center;
  row-gap: 12px;
`;

export const WinnerAvatar = styled.View`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: ${COLORS.white};
  align-items: center;
  justify-content: center;
`;

export const WinnerLogo = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const WinnerName = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: ${COLORS.white};
`;

export const Score = styled.Text`
  font-size: 25px;
  font-weight: 900;
  color: ${COLORS.text};
  margin-top: 4px;
`;