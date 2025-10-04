import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import EventCard from '@/components/cards/event/EventCard';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useState } from 'react';
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
import { authService, UserSessionData } from '@/services/auth/authService';

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
            title="Campeonatos"
            onClick={() => navigation.navigate('BottomTabs', { screen: 'home' })}
            image={require('@/assets/championship/championships.jpg')}
          />
          <EventCard
            title="Notícias"
            onClick={() => navigation.navigate('BottomTabs', { screen: 'news' })}
            image={require('@/assets/news/news.jpg')}
          />
        </CardWrapper>
      </ScrollView>
    </Screen>
  );
};

export default AdminHome;
