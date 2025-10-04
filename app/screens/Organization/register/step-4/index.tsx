import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';

import { auth } from '@/config/firebaseConfig';
import { Organization } from '@/model/organization';
import { authService } from '@/services/auth/authService';
import { UserSession } from '@/utils/session/session';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
    BackButton,
    BackIcon,
    EyeButton,
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

export const OrganizationRegisterStep4 = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation<RootStackNavigationProps>();
    const route = useRoute();
    const step3Data = route.params as Partial<Organization>;

    const handleRegister = useCallback(async () => {
        if (!password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha ambos os campos de senha.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Senha fraca', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true);

        const email = step3Data?.email ?? '';

        if (!email) {
            Alert.alert('Erro', 'O e-mail é obrigatório.');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const sessionData = await authService.login(email.trim(), password);

            await UserSession.save(sessionData);

            Alert.alert('Sucesso', 'Organização criada com sucesso!', [
                { text: 'OK', onPress: () => navigation.navigate('BottomTabs', { screen: 'home' }) },
            ]);

        } catch (error: any) {
            let errorMessage = 'Ocorreu um erro ao tentar criar a conta.';

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este e-mail já está sendo utilizado por outra conta.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'O formato do e-mail é inválido.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'A senha fornecida é muito fraca.';
            }

            Alert.alert('Erro no Registro', errorMessage);
        } finally {
            setLoading(false);
        }
    }, [password, confirmPassword, step3Data, navigation]);

    return (
        <Screen>
            <StatusBar barStyle="light-content" />
            <GradientBg colors={[COLORS.grad1, COLORS.grad2]} start={{ x: 0.1, y: 0 }} end={{ x: 1, y: 1 }}>
                <Safe style={{ alignItems: 'center' }}>
                    <BackButton onPress={() => navigation.goBack()}>
                        <BackIcon name="arrow-left" size={24} color={COLORS.white} />
                    </BackButton>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1, width: '85%', justifyContent: 'center' }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Logo source={require('@/assets/logo.png')} resizeMode="contain" />

                            <StepsContainer>
                                <StepCircle active={true}><StepText active={true}>1</StepText></StepCircle>
                                <StepLine active={true} />
                                <StepCircle active={true}><StepText active={true}>2</StepText></StepCircle>
                                <StepLine active={true} />
                                <StepCircle active={true}><StepText active={true}>3</StepText></StepCircle>
                                <StepLine active={true} />
                                <StepCircle active={true}><StepText active={true}>4</StepText></StepCircle>
                            </StepsContainer>
                        </View>

                        <View style={{ width: '100%', marginTop: 20 }}>
                            <InputWrapper>
                                <TextInputStyled
                                    placeholder="Senha"
                                    placeholderTextColor="#7A7A7A"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!isPasswordVisible}
                                />
                                <EyeButton onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    <FontAwesome name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="#7A7A7A" />
                                </EyeButton>
                            </InputWrapper>

                            <InputWrapper>
                                <TextInputStyled
                                    placeholder="Confirme a senha"
                                    placeholderTextColor="#7A7A7A"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!isConfirmPasswordVisible}
                                />
                                <EyeButton onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                                    <FontAwesome name={isConfirmPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="#7A7A7A" />
                                </EyeButton>
                            </InputWrapper>
                        </View>

                        <View style={{ width: '100%', paddingBottom: 10 }}>
                            <PrimaryButton onPress={handleRegister} disabled={loading}>
                                <PrimaryText>{loading ? 'Cadastrando...' : 'Cadastrar'}</PrimaryText>
                            </PrimaryButton>
                        </View>

                    </KeyboardAvoidingView>
                </Safe>
            </GradientBg>
        </Screen>
    );
};

export default OrganizationRegisterStep4;