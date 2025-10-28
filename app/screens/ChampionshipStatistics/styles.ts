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
  justify-content: space-between;
  margin-top: -28px; /* sobe sobre o gradiente */
  align-self: center;
  width: 90%;
  height: 40%;
  border-radius: 16px;
  padding: 16px 0px;
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
  width: 100%;
  height: 70%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const PodiumItem = styled.View<{ position: '1st' | '2nd' | '3rd' }>`
  align-items: center;
  width: 100px;
`;

export const PodiumColumn = styled.View<{ position: '1st' | '2nd' | '3rd' }>`
  width: 100%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding-top: ${({ position }) =>
    position === '1st' ? '75px' : position === '2nd' ? '65px' : '55px'};
  padding-bottom: 8px;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  height: ${({ position }) =>
    position === '1st' ? '130px' : position === '2nd' ? '110px' : '100px'};
  background-color: ${({ position }) =>
    position === '1st'
      ? '#F16EA6' /* Ouro */
      : position === '2nd'
        ? '#C774B9' /* Prata */
        : '#B381C7' /* Bronze */
  };
`;

export const ContainerPhoto = styled.View`
  width: 100px;
  height: 100px; 
  overflow: hidden; 
  position: absolute;
  top: -67%; 
  z-index: 2;
  background-color: #fff;
`;

export const PodiumPhoto = styled.Image.attrs({
  resizeMode: 'cover',
}) <{ position: '1st' | '2nd' | '3rd' }>`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;

export const PodiumName = styled.Text`
  width: 65%;
  color: #000;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  position: absolute;
  top: -38px;
`;

export const PodiumGoalsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const PodiumGoalsIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

export const PodiumGoalsValue = styled.Text`
  color: ${COLORS.black};
  font-size: 22px;
  font-weight: 600;
`;

export const PodiumRank = styled.Text`
  font-size: 40px;
  font-weight: 800;
  color: #fff; 
  position: absolute;
  top: 15px;
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
`;

export const PlayerPhoto = styled.Image`
 width: 140px;
  height: 160px;
  background-color: #eee;
  border-radius: 16px 0px 65px 16px;
`;

export const PlayerInfo = styled.View`
  align-items: center;
`;

export const PlayerTeamLogo = styled.Image`
  width: 45px;
  height: 45px;
`;

export const PlayerContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 15px 15px;
  gap: 25px;
`;

export const PlayerDetail = styled.View`
   flex-direction: row;
  justify-content: space-between; 
  align-items: flex-start; 
`;

export const PlayerName = styled.Text`
  font-size: 13px;
  padding-top: 4px;
  font-weight: 600;
  color: ${COLORS.text};
  flex-shrink: 1;
`;

export const PlayerRank = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: ${COLORS.text};
  padding-left: 5px;
`;

export const PlayerTeamContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PlayerTeamName = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${COLORS.text};
`

export const PlayerStatisticsContainer = styled.View` 
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: space-between;

`;

export const PlayerStatisticsValue = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.text};
  flex: 1;
`;

export const PlayerStatistics = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-right: 10px;
  margin-top: 10px;
`;

export const PlayerStatisticsIcon = styled.Image`
  width: 27px;
  height: 27px;
`;


export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.tagText};
  text-align: center; 
  width: 230px;
  opacity: 0.7; 
  margin-bottom: 40px;
`;

export const EmptyChampionshipSVG = styled.Image`
  width: 200px;
  height: 200px;
  opacity: 0.7; 
  margin-top: 50px;
`;