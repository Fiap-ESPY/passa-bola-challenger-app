import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import { OrganizationDocument } from '@/services/organization/organizationService';
import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import {
  Container,
  HeaderActions,
  HeaderGrad,
  InfoRow,
  Label,
  Logo,
  LogoutButton,
  LogoutText,
  PlayerListItem,
  PlayerName,
  PlayerPhotoImage,
  PlayerRow,
  Section,
  SectionSubtitle,
  SectionTitle,
  TeamLogoImage,
  Value
} from './styles';
import { authService } from '@/services/auth/authService';
import { UserSession } from '@/utils/session/session';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { useNavigation } from 'expo-router';

type OrganizationProfileProps = {
  organization: OrganizationDocument;
}

const OrganizationProfile = ({ organization }: OrganizationProfileProps) => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const handleLogout = async () => {
    try {
      await authService.logout();
      await UserSession.clear();
      navigation.navigate('BottomTabs', { screen: 'home' });
    } catch (e) {
      Alert.alert(
        'Erro ao sair',
        'Não foi possível encerrar a sessão. Tente novamente.'
      );
    }
  };

  const handleConfirmLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja se deslogar da conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deslogar', style: 'destructive', onPress: handleLogout },
      ],
      { cancelable: true }
    );
  };

  if (!organization) {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Perfil de organização não encontrado.</Text>
      </Container>
    );
  }

  const { name, cnpj, email, phone, addressStreet, addressCity, addressState, cep, addressComplement, team } = organization;

  return (
    <Container>
      <HeaderGrad
        source={headerImage}
        resizeMode="cover"
        alt="Gradient Background"
      >
        <HeaderActions>
          <LogoutButton
            onPress={handleConfirmLogout}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Sair da conta"
          >
            <FontAwesome name="sign-out" size={25} color={COLORS.white} />
            <LogoutText>Sair</LogoutText>
          </LogoutButton>
        </HeaderActions>

        <Logo source={logoImage} resizeMode="contain" alt="Passa bola Logo" />
      </HeaderGrad>


      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <Section>
          <SectionTitle>Organização</SectionTitle>
          <InfoRow>
            <FontAwesome name="user" size={16} color={COLORS.text} />
            <Value>{name.toLocaleUpperCase()}</Value>
          </InfoRow>
          <InfoRow>
            <FontAwesome name="building" size={16} color={COLORS.text} />
            <Value>{cnpj}</Value>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>Contato</SectionTitle>
          <InfoRow>
            <FontAwesome name="envelope" size={16} color={COLORS.text} />
            <Value>{email}</Value>
          </InfoRow>
          <InfoRow>
            <FontAwesome name="phone" size={16} color={COLORS.text} />
            <Value>{phone}</Value>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>Endereço</SectionTitle>
          <Value>{addressStreet}</Value>
          {addressComplement && <Value>{addressComplement}</Value>}
          <Value>{`${addressCity || ''} - ${addressState || ''}`}</Value>
          <Value>CEP: {cep}</Value>
        </Section>

        {team && (
          <Section>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              {team.logo && (
                <TeamLogoImage source={{ uri: team.logo }} />
              )}
              <SectionTitle style={{ marginLeft: team.logo ? 12 : 0 }}>
                {team.name}
              </SectionTitle>
            </View>

            <Label style={{ marginBottom: 4 }}>Jogadoras:</Label>
            {team.players && team.players.length > 0 ? (
              team.players.map((player) => (
                <PlayerRow key={player.id}>
                  {player.photo && (
                    <PlayerPhotoImage source={{ uri: player.photo }} />
                  )}
                  <PlayerName>{player.name} - {player.position}</PlayerName>
                </PlayerRow>
              ))
            ) : (
              <Value>Nenhuma jogadora cadastrada.</Value>
            )}
          </Section>
        )}
      </ScrollView>
    </Container>
  );
};

export default OrganizationProfile;