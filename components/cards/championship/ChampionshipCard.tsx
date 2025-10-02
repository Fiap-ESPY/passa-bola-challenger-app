import { Championship } from '@/model/championship';
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
  ImageBackground,
  ImageOverlay,
  Label,
  LabelText,
  StatusTag,
  StatusTagText,
} from './styles';

import ActionButton from '@/components/buttons/actionbutton/ActionButton';
import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';

type ChampionshipCardProps = {
  championship: Championship;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isAdmin: boolean;
  isOrganization: boolean;
};

const ChampionshipCard = ({
  championship,
  onClick,
  onEdit,
  onDelete,
  isAdmin,
  isOrganization
}: ChampionshipCardProps) => {
  const formattedDate = format(
    parseISO(championship.dateAndHour),
    'dd/MM/yyyy',
    {
      locale: ptBR,
    }
  );

  const formattedHour = format(parseISO(championship.dateAndHour), 'HH:mm', {
    locale: ptBR,
  });

  if (!isAdmin && !isOrganization && !championship.isAvailable) {
    return <></>;
  }

  return (
    <Card>
      {championship?.image ? (
        <ImageBackground
          source={championship?.image}
          resizeMode="cover"
          alt="Image Background"
        >
          <ImageOverlay
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
          />
          <EventTitle>{championship.title}</EventTitle>{
            isAdmin &&
            <StatusTag available={championship.isAvailable}>
              <StatusTagText>{championship.isAvailable ? 'Disponível'.toLocaleUpperCase() : 'Indisponível'.toLocaleUpperCase()}</StatusTagText>
            </StatusTag>
          }
        </ImageBackground>
      ) : (
        <GradientBackground
          colors={[`${COLORS.grad1}`, `${COLORS.grad2}`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Label>
            <LabelText>{championship.type.toLocaleUpperCase()}</LabelText>
          </Label>
          <EventTitle>{championship.title}</EventTitle>
        </GradientBackground>
      )}

      <DescriptionArea>
        <EventDescription>
          <BoldText>Local: </BoldText> {championship.address}
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
        {isOrganization &&
          <ActionButton
            label="Inscrever time"
            onPress={onClick}
            icon={
              <FontAwesome name="info-circle" size={18} color={COLORS.white} />
            }
          />}
      </DescriptionArea>
    </Card>
  );
};

export default ChampionshipCard;
