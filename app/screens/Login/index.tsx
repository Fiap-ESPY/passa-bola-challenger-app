import { UserRole } from '@/model/enum/userRole';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
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

  const navigation = useNavigation<RootStackNavigationProps>();

  const onLogin = async () => {
    if (email === 'admin@passabola.com' && password === '12345678') {
      const admin_user = {
        email,
        role: UserRole.ADMIN,
        loggedInAt: new Date().toISOString(),
      };

      await UserSession.save(admin_user);

      navigation.navigate('AdminHome');
    } else {
      Alert.alert('Erro', 'E-mail ou senha inválidos.');
      console.log('Credenciais incorretas');
    }
  };

  const onForgot = () => {
    // TODO: navegação para recuperar senha
    Alert.alert("Página em desenvolvimento...")
  };
  const onSignUp = () => {
    // TODO: navegação para cadastro
    Alert.alert("Página em desenvolvimento...")
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
              {/* E-mail */}
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

              {/* Senha */}
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

              <PrimaryButton onPress={onLogin}>
                <PrimaryText>Entrar</PrimaryText>
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
