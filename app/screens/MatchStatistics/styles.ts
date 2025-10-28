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
  padding: 0px 2px;
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

export const MatchCard = styled.TouchableOpacity`
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
  align-items: center;
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
  height: 145px;
  border-radius: 28px;
  padding: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  shadow-color: ${COLORS.black};
  shadow-opacity: 0.08;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 3;
`;

export const WinnerBadge = styled.View`
  align-self: flex-start;
  background-color: #ed4d9a;
  padding: 4px 10px;
  border-radius: 12px;
`;

export const WinnerBadgeText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${COLORS.white};
`;

export const WinnerContent = styled.View`
  align-items: center;
`;

export const WinnerAvatar = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 45px;
  background-color: ${COLORS.white};
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

export const WinnerLogo = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 32px;
`;

export const WinnerName = styled.Text`
  font-size: 19px;
  font-weight: 800;
  color: ${COLORS.white};
`;

export const Score = styled.Text`
  font-size: 25px;
  font-weight: 900;
  color: ${COLORS.text};
  margin-top: 4px;
`;

export const SummaryContainer = styled.View`
  margin-top: 24px;
  padding: 15px;
`;

export const SummaryTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const SummaryTitle = styled.Text`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
  color: ${COLORS.text};
  text-align: center;
`;

export const PlayerRow = styled.View`
  flex-direction: row;
  background-color: ${COLORS.white};
  border-radius: 16px;
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  elevation: 2;
  margin: 10px 0px;
  overflow: hidden;
  gap: 12px;
`;

export const PlayerPhoto = styled.Image`
  width: 110px;
  height: 180px;
  background-color: #eee;
  border-radius: 16px 0px 65px 16px;
`;

export const PlayerInfo = styled.View`
  align-items: center;
`;

export const PlayerTeamLogo = styled.Image`
  width: 50px;
  height: 50px;
`;

export const PlayerContainer = styled.View`
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  gap: 23px;
`;

export const PlayerDetail = styled.View`
  align-items: center;
  flex-direction: row;
  padding-right: 30px;
  gap: 5px;
  width: 100%;
`;

export const PlayerName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.text};
`;

export const PlayerStatisticsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 25px;
  width: 200px;
  justify-content: center;
`;

export const PlayerStatisticsValue = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${COLORS.text};
  flex: 1;
  text-align: right;
`;

export const PlayerStatistics = styled.View`
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const PlayerStatisticsIcon = styled.Image`
  width: 25px;
  height: 25px;
`;
