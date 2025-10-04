import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { authService } from '@/services/auth/authService';
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import {
  DividerLine,
  DividerRow,
  DividerText,
  ForgotLink,
  ForgotText,
  Form,
  GradientBg,
  InputWrapper,
  Logo,
  PrimaryButton,
  PrimaryText,
  RightIcon,
  RightIconButton,
  Safe,
  Screen,
  SecondaryButton,
  SecondaryText,
  TextInputStyled,
} from './styles';
import { UserRole } from '@/model/enum/userRole';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RootStackNavigationProps>();

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'E-mail e palavra-passe devem ser preenchidos.');
      return;
    }

    setLoading(true);
    try {
      const sessionData = await authService.login(email.trim(), password);

      await UserSession.save(sessionData);

      if (sessionData.role === UserRole.ADMIN) {
        navigation.navigate('AdminHome');
      } else if (sessionData.role === UserRole.ORGANIZATION) {
        navigation.navigate('BottomTabs', { screen: 'home' });
      } else {
        console.warn(`Role não reconhecida: ${sessionData.role}. A redirecionar para a home padrão.`);
        navigation.navigate('BottomTabs', { screen: 'home' });
      }

    } catch (error: any) {
      let errorMessage = 'E-mail ou palavra-passe inválidos.';

      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'As credenciais fornecidas estão incorretas. Verifique o seu e-mail e palavra-passe.';
      }

      Alert.alert('Erro no Login', errorMessage);
      console.error('Firebase login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onForgot = () => {
    Alert.alert('Página em desenvolvimento...');
  };

  const onSignUp = () => {
    navigation.navigate('OrganizationRegisterStep1');
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Logo source={require('@/assets/logo.png')} resizeMode="contain" />

            <Form>
              <InputWrapper>
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
                <TextInputStyled
                  placeholder="Palavra-passe"
                  placeholderTextColor="#7A7A7A"
                  secureTextEntry={!showPass}
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType="done"
                />
                <RightIconButton
                  onPress={() => setShowPass(s => !s)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <RightIcon name={showPass ? 'eye' : 'eye-off'} />
                </RightIconButton>
              </InputWrapper>

              <ForgotLink onPress={onForgot}>
                <ForgotText>Esqueceu a Senha?</ForgotText>
              </ForgotLink>

              <PrimaryButton onPress={onLogin} disabled={loading}>
                <PrimaryText>{loading ? 'Entrando...' : 'Entrar'}</PrimaryText>
              </PrimaryButton>

              <DividerRow>
                <DividerLine />
                <DividerText>Ou crie sua conta</DividerText>
                <DividerLine />
              </DividerRow>

              <SecondaryButton onPress={onSignUp}>
                <SecondaryText>Cadastrar-se</SecondaryText>
              </SecondaryButton>
            </Form>
          </KeyboardAvoidingView>
        </Safe>
      </GradientBg>
    </Screen>
  );
};

export default Login;

