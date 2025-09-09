import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const SearchIcon = styled(FontAwesome)`
  color: ${COLORS.grayMedium};
`;

export const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  background-color: #f6f6f6;
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 12px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: ${COLORS.text};
`;