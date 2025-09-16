import { COLORS } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: ${COLORS.white};
  border-radius: 16px;
  overflow: hidden;

  /* sombra iOS */
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;

  /* sombra Android */
  elevation: 2;

  margin-bottom: 14px;
`;

export const ImageBackground = styled.ImageBackground`
  height: 140px;
  width: 100%;
  justify-content: flex-end;
`;

export const ImageOverlay = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const EventTitle = styled.Text`
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 20px;
  padding: 15px;
`;

export const DescriptionArea = styled.View`
  padding: 14px;
  gap: 6px;
`;

export const EventDescription = styled.Text`
  color: ${COLORS.sub};
  line-height: 20px;
  flex-direction: row;
  align-items: center;
`;

export const BoldText = styled.Text`
  font-weight: 800;
  color: ${COLORS.text};
`;
