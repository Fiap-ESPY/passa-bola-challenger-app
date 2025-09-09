import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
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

export const GradientBackground = styled(LinearGradient)`
  height: 110px;
  width: 100%;
  padding: 14px;
  justify-content: flex-end;
`;

export const Label = styled.View`
  position: absolute;
  top: 10px;
  left: 12px;
  background-color: ${COLORS.tagBg};
  padding: 6px 10px;
  border-radius: 16px;
`;

export const LabelText = styled.Text`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: ${COLORS.tagText};
`;

export const EventTitle = styled.Text`
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 16px;
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

export const ClockIcon = styled(FontAwesome)`
  color: ${COLORS.sub};
  margin-left: 10px;
`;

export const InfoButton = styled.Pressable<{ available: boolean }>`
  margin-top: 10px;
  padding: 12px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ available }) =>
    available ? COLORS.green : COLORS.tagText};
`;

export const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-weight: 800;
`;

export const ClockWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

export const HourText = styled.Text`
  color: ${COLORS.sub};
  margin-left: 4px;
`;
