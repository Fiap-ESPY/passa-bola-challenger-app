import {
  Card,
  DescriptionArea,
  EventTitle,
  ImageBackground,
  ImageOverlay,
} from './styles';

import ActionButton from '@/components/buttons/actionbutton/ActionButton';
import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { ImageSourcePropType } from 'react-native';

type EventCardProps = {
  title: string;
  onClick: () => void;
  image: ImageSourcePropType;
};

const EventCard = ({ title, onClick, image }: EventCardProps) => {
  return (
    <Card>
      <ImageBackground source={image} resizeMode="cover" alt="Image Background">
        <ImageOverlay
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
        />
        <EventTitle>{title}</EventTitle>
      </ImageBackground>

      <DescriptionArea>
        <ActionButton
          label="Gerenciar"
          onPress={onClick}
          backgroundColor={COLORS.blue}
          icon={<FontAwesome name="gear" size={18} color={COLORS.white} />}
        />
      </DescriptionArea>
    </Card>
  );
};

export default EventCard;
