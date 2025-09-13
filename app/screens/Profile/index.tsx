import { COLORS } from '@/theme/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
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

export default function Profile() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const onLogin = () => {
    // TODO: autenticar
    console.log('login', { email, password });
  };
  const onForgot = () => {
    // TODO: navegação para recuperar senha
    console.log('forgot');
  };
  const onSignUp = () => {
    // TODO: navegação para cadastro
    console.log('signup');
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
          <BackButton onPress={() => router.back()}>
            <BackIcon name="arrow-left" />
          </BackButton>

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
}
