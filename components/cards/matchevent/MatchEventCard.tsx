import { MatchEvent } from '@/model/match';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  BoldText,
  Card,
  ClockIcon,
  ClockWrapper,
  DescriptionArea,
  EventDescription,
  EventTitle,
  GradientBackground,
  HourText,
  Label,
  LabelText,
} from './styles';

import ActionButton from '@/components/buttons/actionbutton/ActionButton';
import { COLORS } from '@/theme/colors';

type MatchEventCardProps = {
  matchEvent: MatchEvent;
  onClick: () => void;
};

const MatchEventCard = ({ matchEvent, onClick }: MatchEventCardProps) => {
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
          <BoldText>Local: </BoldText> {matchEvent.address}
        </EventDescription>
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
          onPress={onClick}
        />
      </DescriptionArea>
    </Card>
  );
};

export default MatchEventCard;
