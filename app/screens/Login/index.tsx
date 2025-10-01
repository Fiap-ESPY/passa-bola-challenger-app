import { UserRole } from '@/model/enum/userRole';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { login } from '@/services/auth';
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

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RootStackNavigationProps>();

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'E-mail e senha devem ser preenchidos.');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);

      const admin_user = {
        email,
        role: UserRole.ADMIN,
        loggedInAt: new Date().toISOString(),
      };

      await UserSession.save(admin_user);
      navigation.navigate('AdminHome');
    } catch (e: any) {
      Alert.alert('Erro', 'E-mail ou senha inválidos.');
      console.error('Firebase login error:', e);
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
                  placeholder="Senha"
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
