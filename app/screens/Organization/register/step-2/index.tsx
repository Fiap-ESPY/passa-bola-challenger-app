import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';

import {
  BackButton,
  BackIcon,
  CrestCircle,
  CrestImage,
  CrestPickerContainer,
  CrestPickerLabel,
  CrestPlaceholder,
  EditIcon,
  EditIconContainer,
  Form,
  GradientBg,
  InputWrapper,
  Logo,
  PrimaryButton,
  PrimaryText,
  Safe,
  Screen,
  StepCircle,
  StepLine,
  StepsContainer,
  StepText,
  TextInputStyled
} from './styles';
import { Organization } from '@/model/organization';

export const OrganizationRegisterStep2 = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [teamCrest, setTeamCrest] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RootStackNavigationProps>();
  const route = useRoute();

  const step1Data = route.params;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para escolher o escudo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setTeamCrest(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!teamName.trim() || !teamCrest) {
      Alert.alert('Erro', 'Por favor, preencha o nome e escolha um escudo para o time.');
      return;
    }

    const organizationData: Partial<Organization> = {
      ...step1Data,
      teamName: teamName.trim(),
      teamCrestUri: teamCrest,
    };

    Alert.alert('Continuar', 'Dados da Etapa 2 coletados. Próxima etapa!');
    navigation.navigate('OrganizationRegisterStep3', organizationData);
  };

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <GradientBg
        colors={[COLORS.grad1, COLORS.grad2]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Safe>
          <BackButton onPress={() => navigation.goBack()}>
            <BackIcon name="arrow-left" size={24} color={COLORS.white} />
          </BackButton>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}
              showsVerticalScrollIndicator={false}
            >
              <Logo source={require('@/assets/logo.png')} resizeMode="contain" />

              <StepsContainer>
                <StepCircle active={true}>
                  <StepText active={true}>1</StepText>
                </StepCircle>
                <StepLine active={true} />
                <StepCircle active={true}>
                  <StepText active={true}>2</StepText>
                </StepCircle>
                <StepLine active={false} />
                <StepCircle active={false}>
                  <StepText active={false}>3</StepText>
                </StepCircle>
                <StepLine active={false} />
                <StepCircle active={false}>
                  <StepText active={false}>4</StepText>
                </StepCircle>
              </StepsContainer>

              <Form>
                <InputWrapper>
                  <TextInputStyled
                    placeholder="Nome do Time"
                    placeholderTextColor="#7A7A7A"
                    value={teamName}
                    onChangeText={setTeamName}
                    returnKeyType="done"
                  />
                </InputWrapper>

                <CrestPickerContainer>
                  <CrestPickerLabel>Escudo do Time</CrestPickerLabel>
                  <CrestCircle onPress={pickImage}>
                    {teamCrest ? (
                      <CrestImage source={{ uri: teamCrest }} />
                    ) : (
                      <CrestPlaceholder source={require('@/assets/teams/logo_team_default.png')} resizeMode="contain" />
                    )}
                    <EditIconContainer>
                      <EditIcon name="camera" size={16} />
                    </EditIconContainer>
                  </CrestCircle>
                </CrestPickerContainer>

                <PrimaryButton onPress={handleContinue} disabled={loading} style={{ marginTop: 10 }}>
                  <PrimaryText>{loading ? 'Carregando...' : 'Continuar'}</PrimaryText>
                </PrimaryButton>
              </Form>
            </ScrollView>
          </KeyboardAvoidingView>
        </Safe>
      </GradientBg>
    </Screen>
  );
};

export default OrganizationRegisterStep2;