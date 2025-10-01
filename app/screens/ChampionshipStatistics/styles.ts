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

export const PodiumContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 24px 16px;
  gap: 5px;
`;

export const PodiumItem = styled.View<{ position: '1st' | '2nd' | '3rd' }>`
  align-items: center;
  width: 100px;
`;

export const PodiumColumn = styled.View<{ position: '1st' | '2nd' | '3rd' }>`
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding-top: ${({ position }) =>
    position === '1st' ? '75px' : position === '2nd' ? '65px' : '55px'};
  padding-bottom: 8px;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  height: ${({ position }) =>
    position === '1st' ? '150px' : position === '2nd' ? '130px' : '110px'};
  background-color: ${
    ({ position }) =>
      position === '1st'
        ? '#FFD700' /* Ouro */
        : position === '2nd'
          ? '#C0C0C0' /* Prata */
          : '#CD7F32' /* Bronze */
  };
`;

export const PodiumPhoto = styled.Image<{ position: '1st' | '2nd' | '3rd' }>`
  width: 80px;
  height: 100px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #fff;
  position: absolute;
  top: -20px;
  z-index: 1;
`;

export const PodiumName = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 13px;
  text-align: center;
`;

export const PodiumGoalsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const PodiumGoalsIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export const PodiumGoalsValue = styled.Text`
  color: ${COLORS.black};
  font-size: 14px;
  font-weight: 600;
`;

export const PodiumRank = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff; 
  position: absolute;
  top: 4px;
  left: 8px;
  z-index: 2;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5); 
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
