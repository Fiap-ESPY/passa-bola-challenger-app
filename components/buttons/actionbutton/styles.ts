import { COLORS } from '@/theme/colors';
import styled from 'styled-components/native';

export const ButtonContainer = styled.Pressable<{ isDisabled: boolean }>`
  flex: 1;
  margin-top: 10px;
  padding: 17px;
  border-radius: 20px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isDisabled }) =>
    isDisabled ? COLORS.tagText : COLORS.green};
`;

export const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-weight: 800;
`;
