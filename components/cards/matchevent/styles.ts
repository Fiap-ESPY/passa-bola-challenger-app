import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Card = styled.View`
  width: 25rem;
  margin: 16px 0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  elevation: 3;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const GradientBackground = styled(LinearGradient)`
  padding: 16px;
`;

export const Label = styled.View`
  background-color: #ffff;
  padding: 4px 8px;
  border-radius: 8px;
  align-self: flex-start;
  margin-bottom: 8px;
`;

export const LabelText = styled.Text`
  color: #9a9a9a;
  font-weight: 700;
  font-size: 12px;
`;

export const EventTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-top: 2rem;
`;

export const DescriptionArea = styled.View<{ available: boolean }>`
  padding: 16px;
  background-color: ${({ available }) => (available ? '#fff' : '#ffd6d6')};
`;

export const EventDescription = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
`;

export const BoldText = styled.Text`
  font-weight: 700;
`;

export const ClockIcon = styled(FontAwesome)`
  margin-left: 1rem;
`;

export const InfoButton = styled.TouchableOpacity<{ available: boolean }>`
  width: 100%;
  height: 40px;
  background-color: ${({ available }) => (available ? '#70ac3a' : '#9A9A9A')};
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 16px;
`;
