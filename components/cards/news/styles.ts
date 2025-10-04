import { COLORS } from '@/theme/colors';
import styled from 'styled-components/native';

export const NewsItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 12px;
  border-radius: 16px;
  background-color: ${COLORS.white};
  margin-bottom: 12px;

  /* sombra iOS */
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  /* sombra Android */
  elevation: 1;
`;

export const NewsThumb = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 6px;
`;

export const NewsInfo = styled.View`
  flex: 1;
`;

export const NewsMetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const NewsPill = styled.Text`
  background-color: ${COLORS.tagBg};
  color: ${COLORS.tagText};
  padding: 2px 10px;
  margin-left: 5px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
`;

export const NewsMetaDivider = styled.View`
  height: 6px;
  flex: 1;
  margin-left: 8px;
  border-radius: 3px;
  background-color: ${COLORS.lightGray};
`;

export const NewsTitle = styled.Text`
  color: ${COLORS.text};
  font-weight: 800;
  font-size: 13px;
  margin-bottom: 4px;
  padding: 2px 8px;
`;

export const NewsExcerpt = styled.Text`
  color: ${COLORS.sub};
  font-size: 12px;
  line-height: 16px;
  padding: 2px 8px;
`;

export const NewsText = styled.Text`
  font-size: 11px;
  color: ${COLORS.grayMedium};
  text-align: right;
  margin-top: 12px;
`;


export const NewsDate = styled.Text`
  font-size: 11px;
  color: ${COLORS.grayMedium};
  text-align: left;
  margin-top: 12px;
`;


export const NewsFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px; 
`;
