import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';


import { NewsCategoryType } from '@/model/enum/newsCategoryType';
import type { News } from '@/model/news';
import { COLORS } from '@/theme/colors';
import { loadNews, saveNews } from '@/utils/news/newsStore';
import { useRoute } from '@react-navigation/native';
import {
  BackButton,
  BackIcon,
  Form,
  HeaderContent,
  HeaderGradient,
  Input,
  InputIcon,
  InputPressable,
  InputValue,
  Label,
  Screen,
  Segment,
  Segmented,
  SegmentText,
  SubmitButton,
  SubmitText,
  TextArea,
  Title
} from './styles';

const initialFormData = {
  title: '',
  description: '',
  pill: '',
  category: NewsCategoryType.GENERAL,
  image: null as ImageSourcePropType | null,
  date: new Date(),
  content: '',
  source: '',
};

const NEWS_CATEGORY_LABELS: Record<NewsCategoryType, string> = {
  [NewsCategoryType.GENERAL]: 'Geral',
  [NewsCategoryType.PASSA_BOLA_NEWS]: 'Passa a Bola',
  [NewsCategoryType.BRASILEIRAO_NEWS]: 'Brasileirão',
};

const NEWS_CATEGORIES = Object.keys(NewsCategoryType)
  .filter(key => !isNaN(Number(key)))
  .map(key => Number(key) as NewsCategoryType);

type FormData = typeof initialFormData;

const AdminCreateNews = () => {
  const route = useRoute();

  const { newsId } = (route.params as { newsId?: number }) || {};

  const isEditMode = !!newsId;

  const [formData, setFormData] = useState(initialFormData);
  const [existingNews, setExistingNews] = useState<News[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    (async () => {
      const storedNews = await loadNews();
      if (storedNews && Array.isArray(storedNews)) setExistingNews(storedNews);
      setHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (isEditMode && hydrated) {
      const newsToEdit = existingNews.find(e => e.id === newsId);
      if (newsToEdit) {
        setFormData({
          title: newsToEdit.title,
          description: newsToEdit.description,
          pill: newsToEdit.pill,
          category: newsToEdit.category,
          image: newsToEdit.image || null,
          date: new Date(newsToEdit.date),
          content: newsToEdit.content,
          source: newsToEdit.source,
        });
      }
    }
  }, [isEditMode, hydrated, existingNews, newsId]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      updateField('image', { uri: result.assets[0].uri });
    }
  };

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || formData.date;
    setShowDatePicker(Platform.OS === 'ios');
    updateField('date', currentDate);
  };

  const handleSubmit = useCallback(async () => {
    if (!hydrated || !formData.title.trim() || !formData.content.trim()) {
      Alert.alert('Erro', 'Por favor, preencha os campos de título e conteúdo.');
      return;
    }

    const newsDataPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      pill: formData.pill.trim(),
      category: formData.category,
      image: formData.image,
      date: formData.date.toISOString(),
      content: formData.content.trim(),
      source: formData.source.trim(),
    };

    try {
      if (isEditMode) {
        const updatedNews = existingNews.map(news =>
          news.id === newsId ? { ...news, ...newsDataPayload } : news
        );
        await saveNews(updatedNews);
        Alert.alert('Sucesso', 'Notícia atualizada com sucesso!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        const numericIds = existingNews.map(e => e.id).filter(id => !isNaN(id));
        const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;

        const newsToCreate: News = {
          id: nextId,
          ...newsDataPayload,
        };
        await saveNews([...existingNews, newsToCreate]);
        Alert.alert('Sucesso', 'Notícia criada com sucesso!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      console.error("Failed to save news:", error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a notícia.');
    }
  }, [existingNews, hydrated, formData, isEditMode, newsId]);

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <HeaderGradient colors={[`${COLORS.grad1}`, `${COLORS.grad2}`]}>
        <HeaderContent>
          <BackButton onPress={() => router.back()}>
            <BackIcon name="arrow-left" />
          </BackButton>
        </HeaderContent>
      </HeaderGradient>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          <Title>{isEditMode ? 'Editar Notícia' : 'Cadastrar Notícia'}</Title>
          <Form>
            <Label>Título</Label>
            <Input
              value={formData.title}
              onChangeText={text => updateField('title', text)}
              placeholder="Título principal da notícia"
              placeholderTextColor="#9CA3AF"
            />

            <Label>Categoria</Label>
            <Segmented>
              {NEWS_CATEGORIES.map(categoryEnum => (
                <Segment
                  key={categoryEnum}
                  $active={formData.category === categoryEnum}
                  onPress={() => updateField('category', categoryEnum)}
                >
                  <SegmentText $active={formData.category === categoryEnum}>
                    {NEWS_CATEGORY_LABELS[categoryEnum]}
                  </SegmentText>
                </Segment>
              ))}
            </Segmented>
            <Label>Descrição (Chamada)</Label>
            <TextArea
              value={formData.description}
              onChangeText={text => updateField('description', text)}
              multiline
              numberOfLines={3}
              placeholder="Uma breve descrição da nóticia"
              placeholderTextColor="#9CA3AF"
            />

            <Label>Conteúdo Completo</Label>
            <TextArea
              value={formData.content}
              onChangeText={text => updateField('content', text)}
              multiline
              numberOfLines={8}
              placeholder="Escreva o conteúdo completo da notícia aqui..."
              placeholderTextColor="#9CA3AF"
              style={{ height: 160, textAlignVertical: 'top' }} 
            />

            <Label>Pill (Rótulo)</Label>
            <Input
              value={formData.pill}
              onChangeText={text => updateField('pill', text)}
              placeholder="Ex: URGENTE, AO VIVO, NOVIDADE"
              placeholderTextColor="#9CA3AF"
            />

            <Label>Data da Publicação</Label>
            <InputPressable onPress={() => setShowDatePicker(true)}>
              <InputIcon name="calendar" />
              <InputValue>
                {formData.date.toLocaleDateString('pt-BR', {
                  day: '2-digit', month: 'long', year: 'numeric'
                })}
              </InputValue>
            </InputPressable>

            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                onChange={onChangeDate}
                locale="pt-BR"
              />
            )}

            <Label>Imagem de Capa</Label>
            <InputPressable onPress={pickImage}>
              {formData.image ? (
                <Image
                  source={formData.image}
                  style={{ width: '100%', height: 100, borderRadius: 8 }}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <InputIcon name="image" />
                  <InputValue>Escolher imagem</InputValue>
                </>
              )}
            </InputPressable>
            <Label>Fonte</Label>
            <Input
              value={formData.source}
              onChangeText={text => updateField('source', text)}
              placeholder="Ex: G1, Site Oficial"
              placeholderTextColor="#9CA3AF"
            />

            <SubmitButton activeOpacity={0.9} onPress={handleSubmit}>
              <SubmitText>
                {isEditMode ? 'Salvar Alterações' : 'Criar Notícia'}
              </SubmitText>
            </SubmitButton>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default AdminCreateNews;