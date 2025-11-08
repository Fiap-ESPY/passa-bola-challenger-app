import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';

import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { useNavigation } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
  HeaderGrad,
  Logo,
  Screen
} from './styles';
import Dashboard from '@/components/dashboard/news';

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
      <ScrollView contentContainerStyle={{ paddingTop: 150 }}>
        <Dashboard />
      </ScrollView>
    </Screen>
  );
};

export default AdminDashboard;
