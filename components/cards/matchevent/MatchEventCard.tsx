import { MatchEvent } from '@/model/matchEvent';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Text, TouchableOpacity } from 'react-native';
import {
  BoldText,
  ButtonText,
  Card,
  ClockIcon,
  DescriptionArea,
  EventDescription,
  EventTitle,
  GradientBackground,
  InfoButton,
  Label,
  LabelText,
} from './styles';

import { RootStackNavigationProps } from '@/app/navigation/navigationTypes';
import { useNavigation } from '@react-navigation/native';

type MatchEventCardProps = {
  matchEvent: MatchEvent;
  onClick: () => void;
};

const MatchEventCard = ({ matchEvent, onClick }: MatchEventCardProps) => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const formattedDate = format(parseISO(matchEvent.dateAndHour), 'dd/MM/yyyy', {
    locale: ptBR,
  });

  const formattedHour = format(parseISO(matchEvent.dateAndHour), 'HH:mm', {
    locale: ptBR,
  });

  return (
    <Card>
      <GradientBackground
        colors={['#F973AD', '#BCA3EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Label>
          <LabelText>{matchEvent.type.toLocaleUpperCase()}</LabelText>
        </Label>
        <EventTitle>{matchEvent.title}</EventTitle>
      </GradientBackground>

      <DescriptionArea available={matchEvent.isAvailable}>
        <EventDescription>
          <BoldText>End. </BoldText>: {matchEvent.address}
        </EventDescription>
        <EventDescription>
          <BoldText>Data </BoldText>: {formattedDate}
          <ClockIcon name="clock-o" size={16} color="black" /> {formattedHour}h
        </EventDescription>

        <InfoButton available={matchEvent.isAvailable} onPress={onClick}>
          <ButtonText>Informações</ButtonText>
        </InfoButton>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text>Ir para Nova Tela</Text>
        </TouchableOpacity>
      </DescriptionArea>
    </Card>
  );
};

export default MatchEventCard;
