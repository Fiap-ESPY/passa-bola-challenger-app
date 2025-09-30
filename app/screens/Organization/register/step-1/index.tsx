import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
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
  TextInputStyled,
} from './styles';

import FontAwesome from '@expo/vector-icons/FontAwesome';

export const OrganizationRegisterStep1 = () => {
  const [email, setEmail] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [complement, setComplement] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RootStackNavigationProps>();

  const handleContinue = () => {
    console.log("Entrei")
    navigation.navigate('OrganizationRegisterStep2')

    // if (!email || !cnpj || !phone || !address || !cep) {
    //   Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
    //   return;
    // }

    // Alert.alert('Continuar', 'Dados da Etapa 1 coletados. Próxima etapa!');
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
                paddingHorizontal: 20,
              }}
              showsVerticalScrollIndicator={false}
            >
              <Logo source={require('@/assets/logo.png')} resizeMode="contain" />

              <StepsContainer>
                <StepCircle active={true}>
                  <StepText active={true}>1</StepText>
                </StepCircle>
                <StepLine />
                <StepCircle active={false}>
                  <StepText active={false}>2</StepText>
                </StepCircle>
                <StepLine />
                <StepCircle active={false}>
                  <StepText active={false}>3</StepText>
                </StepCircle>
                <StepLine />
                <StepCircle active={false}>
                  <StepText active={false}>4</StepText>
                </StepCircle>
              </StepsContainer>

              <Form>
                <InputWrapper>
                  <FontAwesome name="envelope" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="E-mail"
                    placeholderTextColor="#7A7A7A"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    returnKeyType="next"
                  />
                </InputWrapper>


                <InputWrapper>
                  <FontAwesome name="building" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="CNPJ"
                    placeholderTextColor="#7A7A7A"
                    keyboardType="numeric"
                    value={cnpj}
                    onChangeText={setCnpj}
                    returnKeyType="next"
                  />

                </InputWrapper>


                <InputWrapper>
                  <FontAwesome name="phone" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="Telefone"
                    placeholderTextColor="#7A7A7A"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    returnKeyType="next"
                  />
                </InputWrapper>

                <InputWrapper>
                  <FontAwesome name="location-arrow" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="CEP"
                    placeholderTextColor="#7A7A7A"
                    keyboardType="numeric"
                    value={cep}
                    onChangeText={setCep}
                    returnKeyType="done"
                  />
                </InputWrapper>

                <InputWrapper>
                  <FontAwesome name="map-marker" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="Endereço"
                    placeholderTextColor="#7A7A7A"
                    value={address}
                    onChangeText={setAddress}
                    returnKeyType="next"
                  />
                </InputWrapper>

                <InputWrapper>
                  <FontAwesome name="info-circle" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="Complemento"
                    placeholderTextColor="#7A7A7A"
                    value={complement}
                    onChangeText={setComplement}
                    returnKeyType="next"
                  />
                </InputWrapper>

                <PrimaryButton onPress={handleContinue} disabled={loading} style={{ marginTop: 20 }}>
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

export default OrganizationRegisterStep1;