import { COLORS } from '@/theme/colors';
import { router } from 'expo-router';
import React from 'react';
import { HeaderGradient } from '../MatchDetails/styles';
import { BackButton, BackIcon, Container, HeaderContent } from './styles';

const NewsDetails = () => {
  return (
    <Container>
      <HeaderGradient
        colors={[`${COLORS.grad1}`, `${COLORS.grad2}`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <HeaderContent>
          <BackButton onPress={() => router.back()}>
            <BackIcon name="arrow-left" />
          </BackButton>
        </HeaderContent>
      </HeaderGradient>
    </Container>
  );
};

export default NewsDetails;
