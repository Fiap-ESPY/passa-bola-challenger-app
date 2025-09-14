import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import EventCard from '@/components/cards/event/EventCard';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { useNavigation } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { CardWrapper, HeaderGrad, Logo, Screen, WelcomeText } from './styles';

const AdminHome = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <HeaderGrad
        source={headerImage}
        resizeMode="cover"
        alt="Gradient Background"
      >
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
