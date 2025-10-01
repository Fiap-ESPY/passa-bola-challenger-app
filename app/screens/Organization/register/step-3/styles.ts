import { COLORS } from '@/theme/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
`;

export const Safe = styled.SafeAreaView`
  flex: 1;
  width: 85%;
`;

export const GradientBg = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  align-self: center;
`;

export const Form = styled.View`
  width: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  align-self: center;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.white};
  border-radius: 8px;
  height: 50px;
  margin-bottom: 15px;
  padding-horizontal: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const TextInputStyled = styled.TextInput`
  flex: 1;
  color: ${COLORS.black};
  font-size: 16px;
`;

export const PrimaryButton = styled.Pressable`
  height: 64px;
  border-radius: 32px;
  background-color: ${COLORS.black};
  align-items: center;
  justify-content: center;
  margin: 0 4px 10px;
`;

export const PrimaryText = styled.Text`
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: bold;
`;

export const BackButton = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 20px;
  z-index: 2;
  position: absolute;
  left: 0px;
  top: 80px;
`;

export const BackIcon = styled(FontAwesome)`
  color: ${COLORS.white};
  font-size: 24px;
  padding: 0px 2px;
`;

export const StepsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
  max-width: 250px;
  align-self: center;
`;

export const StepCircle = styled.TouchableOpacity<{ active: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => (props.active ? COLORS.black : 'rgba(255, 255, 255, 0.3)')};
  border: 2px solid ${props => (props.active ? COLORS.white : 'rgba(255, 255, 255, 0.5)')};
  align-items: center;
  justify-content: center;
`;

export const StepText = styled.Text<{ active: boolean }>`
  color: ${props => (props.active ? COLORS.white : 'rgba(255, 255, 255, 0.7)')};
  font-size: 16px;
  font-weight: bold;
`;

export const StepLine = styled.View<{ active: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${props => (props.active ? COLORS.black : 'rgba(255, 255, 255, 0.5)')};
  margin-horizontal: 5px;
`;

export const EditIconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLORS.lightGray};
`;

export const EditIcon = styled(FontAwesome)`
  color: ${COLORS.black};
`;

export const FormTitle = styled.Text`
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

export const PlayerCard = styled.View`
  background-color: ${COLORS.white};
  border-radius: 20px;
  padding: 24px 15px;
  align-items: center;
  margin-horizontal: 28px; 
  width: 280px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  elevation: 8;
  margin-bottom: 10px;
  position: relative; 
`;

export const PlayerPhotoCircle = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 60px;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border: 2px solid ${COLORS.lightGray};
  position: relative;
`;

export const PlayerImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 60px;
`;

export const GalleryIconContainer = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-color: ${COLORS.black};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

export const GalleryIcon = styled(FontAwesome)`
  color: ${COLORS.white};
`;

export const PlayerInput = styled.TextInput`
  width: 95%;
  height: 50px;
  background-color: #e9e9e9;
  border-radius: 12px;
  padding-horizontal: 15px;
  font-size: 16px;
  color: ${COLORS.black};
  margin-top: 12px;
`;

export const NextButton = styled.TouchableOpacity`
  position: absolute;
  right: -25px; 
  top: 50%;
  transform: translateY(-20px); 
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${COLORS.black};
  justify-content: center;
  align-items: center;
  elevation: 12;
  z-index: 10;
`;

export const PrevButton = styled(NextButton)`
  right: auto; 
  left: -20px; 
`;

export const NextIcon = styled(FontAwesome)`
    font-size: 19px;
`;

export const InfoText = styled.Text`
  color: ${COLORS.white};
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
  opacity: 0.8;
`;

export const CarouselContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PositionSelectorContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 15px;
  gap: 5px;
`;


export const PositionButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid ${props => (props.active ? COLORS.black : COLORS.lightGray)};
  background-color: ${props => (props.active ? COLORS.black : 'transparent')};
`;

export const PositionButtonText = styled.Text<{ active: boolean }>`
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.active ? COLORS.white : COLORS.black)};
`;

export const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px;
  z-index: 10; 
`;
