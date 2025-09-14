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
import { FontAwesome } from '@expo/vector-icons';

type MatchEventCardProps = {
  matchEvent: MatchEvent;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isAdmin: boolean;
};

const MatchEventCard = ({
  matchEvent,
  onClick,
  onEdit,
  onDelete,
  isAdmin,
}: MatchEventCardProps) => {
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
          label="Informações"
          onPress={onClick}
          icon={
            <FontAwesome name="info-circle" size={18} color={COLORS.white} />
          }
        />
        {isAdmin && (
          <>
            <ActionButton
              backgroundColor={COLORS.grayMedium}
              label="Editar evento"
              onPress={onEdit}
              icon={<FontAwesome name="edit" size={18} color={COLORS.white} />}
            />
            <ActionButton
              backgroundColor={COLORS.red}
              label="Remover evento"
              onPress={onDelete}
              icon={<FontAwesome name="trash" size={18} color={COLORS.white} />}
            />
          </>
        )}
      </DescriptionArea>
    </Card>
  );
};

export default MatchEventCard;
