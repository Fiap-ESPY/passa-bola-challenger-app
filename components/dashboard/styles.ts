import styled from 'styled-components/native';
import { BarChart } from "react-native-gifted-charts";

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: #f0f2f5; 
  padding: 16px;
  justify-content: center; 
`;

export const CardContainer = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  
  /* Sombra para iOS */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;

  /* Sombra para Android */
  elevation: 5;
`;

export const ChartTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2f2e41;
  margin-bottom: 24px;
  text-align: center;
`;
