import styled from 'styled-components/native';
import { Image, ImageBackground } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #f2f2f2;
  height: 100%;
  margin: 2rem;
`;

export const Header = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20rem;
`;

export const Logo = styled(Image)`
  width: 250px;
  resize-mode: contain;
`;


export const CardContainer = styled.View`
  flex: 1;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const FilterLabel = styled.View`
  background-color: #ffff;
  padding: 4px 8px;
  border-radius: 20px;
  align-self: flex-start;
  margin-bottom: 8px;
  width: 6rem;
  text-align: center;
`;