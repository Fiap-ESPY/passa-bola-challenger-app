import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import EventCard from '@/components/cards/event/EventCard';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { Alert, ScrollView, StatusBar } from 'react-native';
import {
  CardWrapper,
  HeaderActions,
  HeaderGrad,
  Logo,
  LogoutButton,
  LogoutText,
  Screen,
  WelcomeText,
} from './styles';

const AdminHome = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);

      navigation.navigate('BottomTabs', { screen: 'home' });
      UserSession.clear;
    } catch (e) {
      Alert.alert(
        'Erro ao sair',
        'Não foi possível encerrar a sessão. Tente novamente.'
      );
    }
  };

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <HeaderGrad
        source={headerImage}
        resizeMode="cover"
        alt="Gradient Background"
      >
        <HeaderActions>
          <LogoutButton
            onPress={handleLogout}
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

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        <WelcomeText>Bem-vindo, Administrador! </WelcomeText>

        <CardWrapper>
          <EventCard
            title="Campeonatos"
            onClick={() => navigation.navigate('AdminEvents')}
            image={require('@/assets/events.jpg')}
          />
          <EventCard
            title="Notícias"
            onClick={() => navigation.navigate('AdminNews')}
            image={require('@/assets/news.jpg')}
          />
        </CardWrapper>
      </ScrollView>
    </Screen>
  );
};

export default AdminHome;
