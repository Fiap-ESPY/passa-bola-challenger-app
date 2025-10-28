import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import { Alert, FlatList, StatusBar, View, ActivityIndicator } from 'react-native';

import {
  BackButton,
  BackIcon,
  CarouselContainer,
  DeleteButton,
  GalleryIcon,
  GalleryIconContainer,
  GradientBg,
  Logo,
  NextButton,
  NextIcon,
  PlayerCard,
  PlayerImage,
  PlayerInput,
  PlayerPhotoCircle,
  PositionButton,
  PositionButtonText,
  PositionSelectorContainer,
  PrevButton,
  PrimaryButton,
  PrimaryText,
  Safe,
  Screen,
  StepCircle,
  StepLine,
  StepsContainer,
  StepText
} from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { Organization } from '@/model/organization';
import { Player } from '@/model/player';
import { storageService } from '@/services/storage/storageService';

const POSITIONS = [
  { key: 'GOL', label: 'GOL' },
  { key: 'DEF', label: 'DEF' },
  { key: 'MEI', label: 'MEI' },
  { key: 'ATA', label: 'ATA' },
];

type PlayerFormData = Omit<Player, 'photo'> & { photo?: string };

export const OrganizationRegisterStep3 = () => {
  const createEmptyPlayer = (): PlayerFormData => ({
    id: Date.now() + Math.random(),
    name: undefined,
    age: undefined,
    position: undefined,
    photo: undefined,
  });

  const [players, setPlayers] = useState<PlayerFormData[]>([createEmptyPlayer()]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackNavigationProps>();

  const route = useRoute();
  const step2Data = route.params as Partial<Organization>;

  const flatListRef = useRef<FlatList>(null);

  const handleInputChange = (field: keyof PlayerFormData, value: string, index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const pickImage = async (index: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return;

    setLoading(true);
    try {
      const imageUri = result.assets[0].uri;
    
      const updatedPlayers = [...players];
      updatedPlayers[index].photo = imageUri;
      setPlayers(updatedPlayers);
    } catch (error) {
      Alert.alert('Erro de Upload', 'Não foi possível enviar a foto da jogadora.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPlayer = () => {
    const currentPlayer = players[currentIndex];
    if (!currentPlayer.name || !currentPlayer.age || !currentPlayer.position) {
      Alert.alert('Campos incompletos', 'Por favor, preencha todos os dados da jogadora antes de adicionar outra.');
      return;
    }
    if (currentIndex === players.length - 1) {
      setPlayers(prev => [...prev, createEmptyPlayer()]);
    }
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    }, 100);
  };

  const handlePrevPlayer = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  };

  const handleContinue = () => {
    if (!players[0].name || !players[0].age || !players[0].position || !players[0].photo) {
      Alert.alert('Cadastro Incompleto', 'Cadastre pelo menos uma jogadora com todos os dados e foto.');
      return;
    }
    const finalPlayers = players.filter(p => p.name && p.age && p.position && p.photo);
    if (finalPlayers.length === 0) {
      Alert.alert('Erro', 'Nenhuma jogadora foi cadastrada completamente.');
      return;
    }

    const organizationData: Partial<Organization> = {
      ...step2Data,
      team: {
        ...(step2Data.team || { id: Date.now(), name: 'Nome do Time Padrão' }),
        players: finalPlayers as Player[],
      },
    };

    navigation.navigate('OrganizationRegisterStep4', organizationData);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleDeletePlayer = (indexToDelete: number) => {
    Alert.alert('Confirmar Ação', 'Tem certeza que deseja remover esta jogadora?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover', style: 'destructive',
          onPress: () => {
            if (players.length > 1) {
              setPlayers(prev => prev.filter((_, index) => index !== indexToDelete));
              const newIndex = Math.max(0, indexToDelete - 1);
              setTimeout(() => flatListRef.current?.scrollToIndex({ index: newIndex, animated: true }), 100);
            } else {
              setPlayers([createEmptyPlayer()]);
            }
          },
        },
      ]
    );
  };

  const renderPlayerForm = ({ item, index }: { item: PlayerFormData; index: number }) => {
    const hasData = item.name || item.age || item.position || item.photo;
    const isLastPlayer = index === players.length - 1;

    return (
      <PlayerCard>
        {hasData && !isLastPlayer && (
          <DeleteButton onPress={() => handleDeletePlayer(index)}>
            <FontAwesome name="trash" size={27} color={COLORS.red} />
          </DeleteButton>
        )}
        {index > 0 && (
          <PrevButton onPress={handlePrevPlayer}>
            <NextIcon name="arrow-left" size={20} color={COLORS.white} />
          </PrevButton>
        )}

        <PlayerPhotoCircle onPress={() => pickImage(index)}>
          {loading && currentIndex === index ? (
            <ActivityIndicator size="large" color={COLORS.white} />
          ) : item.photo ? (
            <PlayerImage source={{ uri: item.photo }} />
          ) : (
            <>
              <PlayerImage source={require('@/assets/players/default_player.jpg')} style={{ opacity: 0.8 }} />
              <GalleryIconContainer>
                <GalleryIcon name="camera" size={16} />
              </GalleryIconContainer>
            </>
          )}
        </PlayerPhotoCircle>

        <PlayerInput
          placeholder="Nome"
          placeholderTextColor="#7A7A7A"
          value={item.name}
          onChangeText={text => handleInputChange('name', text, index)}
        />
        <PlayerInput
          placeholder="Idade"
          placeholderTextColor="#7A7A7A"
          value={String(item.age ?? '')}
          onChangeText={text => handleInputChange('age', text, index)}
          keyboardType="numeric"
        />
        <PositionSelectorContainer>
          {POSITIONS.map(pos => (
            <PositionButton
              key={pos.key}
              active={item.position === pos.key}
              onPress={() => handleInputChange('position', pos.key, index)}
            >
              <PositionButtonText active={item.position === pos.key}>
                {pos.label}
              </PositionButtonText>
            </PositionButton>
          ))}
        </PositionSelectorContainer>

        <NextButton onPress={handleNextPlayer}>
          <NextIcon name={isLastPlayer ? 'plus' : 'arrow-right'} color={COLORS.white} />
        </NextButton>
      </PlayerCard>
    );
  };

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <GradientBg colors={[COLORS.grad1, COLORS.grad2]} start={{ x: 0.1, y: 0 }} end={{ x: 1, y: 1 }}>
        <Safe>
          <BackButton onPress={() => navigation.goBack()}>
            <BackIcon name="arrow-left" size={24} color={COLORS.white} />
          </BackButton>

          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <Logo source={require('@/assets/logo.png')} resizeMode="contain" />
            <StepsContainer>
              <StepCircle active={true}><StepText active={true}>1</StepText></StepCircle>
              <StepLine active={true} />
              <StepCircle active={true}><StepText active={true}>2</StepText></StepCircle>
              <StepLine active={true} />
              <StepCircle active={true}><StepText active={true}>3</StepText></StepCircle>
              <StepLine active={false} />
              <StepCircle active={false}><StepText active={false}>4</StepText></StepCircle>
            </StepsContainer>
          </View>

          <CarouselContainer>
            <FlatList
              ref={flatListRef}
              data={players}
              renderItem={renderPlayerForm}
              keyExtractor={(item) => String(item.id)}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: 'center' }}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            />
          </CarouselContainer>

          <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            <PrimaryButton onPress={handleContinue} disabled={loading}>
              <PrimaryText>{loading ? 'A carregar...' : 'Continuar'}</PrimaryText>
            </PrimaryButton>
          </View>
        </Safe>
      </GradientBg>
    </Screen>
  );
};

export default OrganizationRegisterStep3;