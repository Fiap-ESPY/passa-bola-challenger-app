import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';

import { BRACKET_EVENTS_DATA } from '@/data/brackEventData';
import type { Championship } from '@/model/championship';
import { COLORS } from '@/theme/colors';
import { loadEvents, saveEvents } from '@/utils/events/eventsStore';
import {
  BackButton,
  BackIcon,
  Form,
  HeaderContent,
  HeaderGradient,
  Input,
  Label,
  Screen,
  Segment,
  Segmented,
  SegmentText,
  SubmitButton,
  SubmitText,
  Title,
} from './styles';

type EventType = 'racha' | 'campeonato';

const AdminCreateEvent = () => {
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<EventType>('racha');
  const [address, setAddress] = useState<string>('');

  const [existing, setExisting] = useState<Championship[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const stored = await loadEvents();
      if (stored && Array.isArray(stored)) setExisting(stored);
      setHydrated(true);
    })();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!hydrated) return;

    const numericIds = existing.map(e => Number(e.id)).filter(n => !isNaN(n));
    const nextNumeric = numericIds.length ? Math.max(...numericIds) + 1 : 1;

    const newEvent: Championship = {
      id: nextNumeric,
      title: title.trim(),
      type,
      address: address.trim(),
      dateAndHour: '2025-10-05',
      isAvailable: true,
      brackEvents: BRACKET_EVENTS_DATA,
      tournamentWinner: null,
    };

    const updated = [...existing, newEvent];
    await saveEvents(updated);

    Alert.alert('Sucesso', 'Evento criado com sucesso!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  }, [existing, title, type, address, hydrated]);

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        >
          <Title>Cadastrar Campeonatos/Rachas </Title>
          <Form>
            <Label>Título</Label>
            <Input value={title} onChangeText={setTitle} returnKeyType="next" />

            <Label>Tipo</Label>
            <Segmented>
              <Segment
                activeOpacity={0.8}
                $active={type === 'racha'}
                onPress={() => setType('racha')}
              >
                <SegmentText $active={type === 'racha'}>Racha</SegmentText>
              </Segment>
              <Segment
                activeOpacity={0.8}
                $active={type === 'campeonato'}
                onPress={() => setType('campeonato')}
              >
                <SegmentText $active={type === 'campeonato'}>
                  Campeonato
                </SegmentText>
              </Segment>
            </Segmented>

            <Label>Endereço</Label>
            <Input value={address} onChangeText={setAddress} />

            <SubmitButton activeOpacity={0.9} onPress={handleSubmit}>
              <SubmitText>Criar evento</SubmitText>
            </SubmitButton>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default AdminCreateEvent;
