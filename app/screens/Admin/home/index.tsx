import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import EventCard from '@/components/cards/event/EventCard';

import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { authService } from '@/services/auth/authService';
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
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

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        <WelcomeText>Bem-vindo, Administrador!</WelcomeText>

        <CardWrapper>
          <EventCard
            title="Dashboards"
            buttonLabel="Visualizar"
            onClick={() => navigation.navigate('AdminDashboard')}
            image={require('@/assets/dashboard/dashboard.png')}
            icon={<FontAwesome name="eye" size={18} color={COLORS.white} />}
          />
          <EventCard
            title="Campeonatos"
            buttonLabel="Gerenciar"
            onClick={() => navigation.navigate('AdminEvents')}
            image={require('@/assets/championship/championships.jpg')}
            icon={<FontAwesome name="gear" size={18} color={COLORS.white} />}
          />
          <EventCard
            title="Notícias"
            buttonLabel="Gerenciar"
            onClick={() => navigation.navigate('AdminNews')}
            image={require('@/assets/news/news.jpg')}
            icon={<FontAwesome name="gear" size={18} color={COLORS.white} />}
          />
        </CardWrapper>
      </ScrollView>
    </Screen>
  );
};

export default AdminHome;
