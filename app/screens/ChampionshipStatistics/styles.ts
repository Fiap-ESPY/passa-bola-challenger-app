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
  height: 30%;
  border-radius: 16px;
  padding-top: 16px;
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
  height: 80%;
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
    position === '1st' ? '118px' : position === '2nd' ? '91px' : '77px'};
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
  top: -60%; 
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
  width: 60%;
  color: #000;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  position: absolute;
  top: -40px;

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
  font-size: 50px;
  font-weight: bold;
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
  height: 180px;
  background-color: #eee;
  border-radius: 16px 0px 65px 16px;
`;

export const PlayerInfo = styled.View`
  align-items: center;
`;

export const PlayerTeamLogo = styled.Image`
  width: 35px;
  height: 35px;
`;

export const PlayerContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 15px 25px;
  gap: 30px;
  

`;

export const PlayerDetail = styled.View`
   flex-direction: row;
  justify-content: space-between; 
  align-items: flex-start; 
`;

export const PlayerName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.text};
  flex-shrink: 1;

`;

export const PlayerRank = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${COLORS.text};
`;

export const PlayerTeamContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  gap: 8px;
`;

export const PlayerTeamName = styled.Text`
  font-size: 15px;
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
  font-weight: 500;
  color: ${COLORS.text};
  flex: 1;
  
`;

export const PlayerStatistics = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;


`;

export const PlayerStatisticsIcon = styled.Image`
  width: 25px;
  height: 25px;
`;
