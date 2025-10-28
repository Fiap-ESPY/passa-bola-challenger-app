import { Championship } from '@/model/championship';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  ActionsContainer,
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
  TotalTeamsText,
} from './styles';

import ActionButton from '@/components/buttons/actionbutton/ActionButton';
import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { OrganizationDocument } from '@/services/organization/organizationService';

type ChampionshipCardProps = {
  championship: Championship;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isAdmin: boolean;
  isOrganization: boolean;
  organization?: OrganizationDocument | null;
};

const ChampionshipCard = ({
  championship,
  onClick,
  onEdit,
  onDelete,
  isAdmin,
  isOrganization,
  organization
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
    <Card onPress={onClick} activeOpacity={0.8}>
      {championship?.image ? (
        <ImageBackground
          source={{ uri: championship.image }}
          resizeMode="cover"
          alt="Image Background"
        >
          <ImageOverlay
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
          />
          <EventTitle>{championship.title}</EventTitle>
          {(isAdmin || isOrganization) && (
            <>
              <StatusTag available={championship.isAvailable}>
                <StatusTagText>{championship.isAvailable ? (organization?.team?.id && championship.registeredTeams?.includes(organization?.team?.id) ? 'Inscrito!' : 'Disponível'.toLocaleUpperCase()) : 'Indisponível'.toLocaleUpperCase()}</StatusTagText>
              </StatusTag>
              {championship.type === 'campeonato' && <TotalTeamsText>{championship.registeredTeams?.length ?? 0}/{championship.maxTeams ?? 0} times</TotalTeamsText>}
            </>
          )}
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
          {(isAdmin || isOrganization) && (
            <>
              <StatusTag available={championship.isAvailable}>
                <StatusTagText>{championship.isAvailable ? (organization?.team?.id && championship.registeredTeams?.includes(organization?.team?.id) ? 'Inscrito!' : 'Disponível'.toLocaleUpperCase()) : 'Indisponível'.toLocaleUpperCase()}</StatusTagText>
              </StatusTag>
              {championship.type === 'campeonato' && <TotalTeamsText>{championship.registeredTeams?.length ?? 0}/{championship.maxTeams ?? 0} times</TotalTeamsText>}
            </>
          )}
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


        {isAdmin && (
          <>
            <ActionsContainer>
              <ActionButton
                backgroundColor={COLORS.grayMedium}
                label="Editar"
                onPress={onEdit}
                icon={<FontAwesome name="edit" size={18} color={COLORS.white} />}
              />
              <ActionButton
                backgroundColor={COLORS.red}
                label="Remover"
                onPress={onDelete}
                icon={<FontAwesome name="trash" size={18} color={COLORS.white} />}
              />
            </ActionsContainer>
          </>
        )}
      </DescriptionArea>
    </Card>
  );
};

export default ChampionshipCard;
