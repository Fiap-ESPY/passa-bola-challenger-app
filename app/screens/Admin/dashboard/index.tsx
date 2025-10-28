import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';

import Dashboard from '@/components/dashboard';
import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
  HeaderGrad,
  Logo,
  Screen,
  WelcomeText
} from './styles';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { useNavigation } from 'expo-router';

const AdminDashboard = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  
  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <HeaderGrad
        source={headerImage}
        resizeMode="cover"
        alt="Gradient Background"
      >
        <BackButton onPress={() => navigation.navigate('AdminHome')}>
          <BackIcon name="arrow-left" />
        </BackButton>
        <Logo source={logoImage} resizeMode="contain" alt="Passa bola Logo" />
      </HeaderGrad>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
      >
        <Dashboard />
      </ScrollView>
    </Screen>
  );
};

export default AdminDashboard;
