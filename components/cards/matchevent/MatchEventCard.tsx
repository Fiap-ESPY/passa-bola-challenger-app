import { MatchEvent } from '@/model/matchEvent';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Text } from 'react-native';
import {
  BoldText,
  ButtonText,
  Card,
  ClockIcon,
  ClockWrapper,
  DescriptionArea,
  EventDescription,
  EventTitle,
  GradientBackground,
  HourText,
  InfoButton,
  Label,
  LabelText,
} from './styles';

import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '@/components/buttons/actionbutton/ActionButton';

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
        colors={[`${COLORS.grad1}`, `${COLORS.grad2}`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Label>
          <LabelText>{matchEvent.type.toLocaleUpperCase()}</LabelText>
        </Label>
        <EventTitle>{matchEvent.title}</EventTitle>
      </GradientBackground>

      <DescriptionArea>
        <EventDescription>
          <BoldText>Data: </BoldText> {formattedDate}
          <ClockWrapper>
            <ClockIcon name="clock-o" size={15} />
            <HourText>{formattedHour}h</HourText>
          </ClockWrapper>
        </EventDescription>

        <ActionButton
          isDisabled={!matchEvent.isAvailable}
          label="Informações"
          onPress={() =>
            navigation.navigate('MatchDetails', { matchId: matchEvent.id })
          }
        />
      </DescriptionArea>
    </Card>
  );
};

export default MatchEventCard;
