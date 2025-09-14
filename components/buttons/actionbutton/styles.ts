import { COLORS } from '@/theme/colors';
import styled from 'styled-components/native';

export const ButtonContainer = styled.Pressable<{
  isDisabled: boolean;
  backgroundColor?: string;
}>`
  flex: 1;
  margin-top: 10px;
  padding: 12px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ isDisabled, backgroundColor }) =>
    isDisabled ? COLORS.gray : backgroundColor || COLORS.green};
`;

export const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-weight: 800;
`;

export const IconWrapper = styled.View`
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;