import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
  Form,
  GradientBg,
  InputWrapper,
  Logo,
  PrimaryButton,
  PrimaryText,
  Row,
  Safe,
  Screen,
  StepCircle,
  StepLine,
  StepsContainer,
  StepText,
  TextInputStyled,
} from './styles';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Organization } from '@/model/organization';

export const OrganizationRegisterStep1 = () => {
  const [organizationData, setOrganizationData] = useState<Partial<Organization>>({
    email: '',
    cnpj: '',
    phone: '',
    cep: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressComplement: '',
  });

  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const navigation = useNavigation<RootStackNavigationProps>();

  const handleCepLookup = async (cepValue: string) => {
    const formattedCep = cepValue.replace(/\D/g, '');
    if (formattedCep.length !== 8) return;

    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${formattedCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('CEP não encontrado', 'Por favor, verifique o CEP digitado.');

        setOrganizationData(prev => ({ ...prev, addressStreet: '', addressCity: '', addressState: '' }));
      } else {
        setOrganizationData(prev => ({
          ...prev,
          addressStreet: data.logradouro || '',
          addressCity: data.localidade || '',
          addressState: data.uf || '',
          addressComplement: data.complemento || '',
        }));
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP. Verifique sua conexão.');
    } finally {
      setCepLoading(false);
    }
  };

  const handleContinue = () => {
    const { email, cnpj, phone, cep, addressStreet, addressCity, addressState } = organizationData;

    if (!email || !cnpj || !phone || !cep || !addressStreet || !addressCity || !addressState) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    navigation.navigate('OrganizationRegisterStep2', organizationData);
  };


  const handleInputChange = (field: keyof Organization, value: string) => {
    setOrganizationData(prevState => ({
      ...prevState,
      [field]: value,
    }));
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
                <StepLine active={false} />
                <StepCircle active={false}>
                  <StepText active={false}>2</StepText>
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
                  <FontAwesome name="envelope" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="E-mail"
                    placeholderTextColor="#7A7A7A"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={organizationData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    returnKeyType="next"
                  />
                </InputWrapper>

                <InputWrapper>
                  <FontAwesome name="building" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="CNPJ"
                    placeholderTextColor="#7A7A7A"
                    keyboardType="numeric"
                    value={organizationData.cnpj}
                    onChangeText={(text) => handleInputChange('cnpj', text)}
                    returnKeyType="next"
                  />

                </InputWrapper>

                <InputWrapper >
                  <FontAwesome name="phone" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="Telefone"
                    placeholderTextColor="#7A7A7A"
                    keyboardType="phone-pad"
                    value={organizationData.phone}
                    onChangeText={(text) => handleInputChange('phone', text)}
                    returnKeyType="next"
                  />
                </InputWrapper>
                <InputWrapper>
                  <FontAwesome name="location-arrow" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="CEP"
                    placeholderTextColor="#7A7A7A"
                    keyboardType="numeric"
                    value={organizationData.cep}
                    onChangeText={(text) => {
                      handleInputChange('cep', text);
                      if (text.length === 8) handleCepLookup(text);
                    }}
                    maxLength={8}
                    returnKeyType="done"
                  />
                  {cepLoading && <ActivityIndicator color={COLORS.blue} />}
                </InputWrapper>

                <InputWrapper>
                  <FontAwesome name="map-marker" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="Endereço"
                    placeholderTextColor="#7A7A7A"
                    value={organizationData.addressStreet}
                    onChangeText={(text) => handleInputChange('addressStreet', text)}
                    returnKeyType="next"
                  />
                </InputWrapper>

                <Row>
                  <InputWrapper width="55%">
                    <FontAwesome name="map" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                    <TextInputStyled
                      placeholder="Cidade"
                      placeholderTextColor="#7A7A7A"
                      value={organizationData.addressCity}
                      onChangeText={(text) => handleInputChange('addressCity', text)}
                    />
                  </InputWrapper>
                  <InputWrapper width="40%">
                    <FontAwesome name="flag" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                    <TextInputStyled
                      placeholder="UF"
                      placeholderTextColor="#7A7A7A"
                      value={organizationData.addressState}
                      onChangeText={(text) => handleInputChange('addressState', text)}
                      maxLength={2}
                      autoCapitalize="characters"
                    />
                  </InputWrapper>
                </Row>
                <InputWrapper>
                  <FontAwesome name="info-circle" size={20} color="#7A7A7A" style={{ marginRight: 10 }} />
                  <TextInputStyled
                    placeholder="Complemento (opcional)"
                    placeholderTextColor="#7A7A7A"
                    value={organizationData.addressComplement}
                    onChangeText={(text) => handleInputChange('addressComplement', text)}
                  />
                </InputWrapper>

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

export default OrganizationRegisterStep1;