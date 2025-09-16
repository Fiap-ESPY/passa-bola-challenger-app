import { COLORS } from '@/theme/colors';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: ${COLORS.bg};
`;

export const WelcomeText = styled.Text`
  font-size: 23px;
  font-weight: 700;
  color: ${COLORS.text};
  margin-vertical: 25px;
  text-align: center;
`;

export const HeaderGrad = styled(ImageBackground)`
  height: 220px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 140px;
`;

export const HeaderCard = styled.View`
  background-color: ${COLORS.white};
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

export const CardWrapper = styled.View`
  gap: 30px;
`;

export const HeaderActions = styled.View`
  position: absolute;
  top: 70px;
  right: 20px;
  z-index: 2;
  flex-direction: row;
`;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.35);

  /* sombra iOS */
  shadow-color: #000;
  shadow-opacity: 0.12;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;

  /* sombra Android */
  elevation: 3;
`;

export const LogoutText = styled.Text`
  color: ${COLORS.white};
  font-weight: 700;
`;
