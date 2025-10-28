import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

import { NewsCategoryType } from '@/model/enum/newsCategoryType';
import { NewsInput, newsService } from '@/services/news/newsService';
import { storageService } from '@/services/storage/storageService';
import { COLORS } from '@/theme/colors';
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
import { useRoute } from '@react-navigation/native';


const initialFormData = {
  title: '',
  description: '',
  pill: '',
  category: NewsCategoryType.GENERAL,
  image: '',
  date: new Date().toISOString().split('T')[0], 
  content: '',
  source: '',
};

type FormData = Omit<NewsInput, 'id'>;

const AdminCreateNews = () => {
  const route = useRoute();
  const { newsId } = (route.params as { newsId?: string }) || {};
  const isEditMode = !!newsId;

  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [loading, setLoading] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  React.useEffect(() => {
    if (!isEditMode) return;

    const fetchNews = async () => {
      setLoading(true);
      try {
        const newsToEdit = await newsService.getNewsByDocId(newsId);
        if (newsToEdit) {
          setFormData({
            title: newsToEdit.title,
            description: newsToEdit.description,
            pill: newsToEdit.pill,
            category: newsToEdit.category,
            image: newsToEdit.image,
            date: newsToEdit.date,
            content: newsToEdit.content,
            source: newsToEdit.source,
          });
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados da notícia.');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [isEditMode, newsId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (result.canceled) return;

    setLoading(true);
    try {
      const imageUri = result.assets[0].uri;
      const downloadURL = await storageService.uploadFileAndGetURL(imageUri, 'news-covers');
      updateField('image', downloadURL);
    } catch (error) {
      Alert.alert('Erro', 'Falha no upload da imagem.');
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      updateField('date', selectedDate.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = React.useCallback(async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      Alert.alert('Erro', 'Por favor, preencha os campos de título e conteúdo.');
      return;
    }

    setLoading(true);

    try {
      const newsDataPayload: NewsInput = { ...formData };

      if (isEditMode) {
        await newsService.updateNews(newsId, newsDataPayload);
        Alert.alert('Sucesso', 'Notícia atualizada com sucesso!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        await newsService.addNews(newsDataPayload);
        Alert.alert('Sucesso', 'Notícia criada com sucesso!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao salvar a notícia.');
    } finally {
      setLoading(false);
    }
  }, [formData, isEditMode, newsId]);

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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              {Object.values(NewsCategoryType).map(category => (
                <Segment
                  key={category}
                  $active={category ? formData.category === category : NewsCategoryType.GENERAL === category}
                  onPress={() => updateField('category', category as NewsCategoryType)}
                >
                  <SegmentText $active={formData.category === category}>
                    {category}
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
              placeholder="Uma breve descrição da notícia"
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

            <Label>Rótulo</Label>
            <Input
              value={formData.pill.toLocaleUpperCase()}
              onChangeText={text => updateField('pill', text)}
              placeholder="Ex: URGENTE, AO VIVO, NOVIDADE"
              placeholderTextColor="#9CA3AF"
            />

            <Label>Data da Publicação</Label>
            <InputPressable onPress={() => setShowDatePicker(true)}>
              <InputIcon name="calendar" />
              <InputValue>
                {new Date(formData.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
              </InputValue>
            </InputPressable>

            {showDatePicker && (
              <DateTimePicker
                value={new Date(formData.date)}
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
                  source={{ uri: formData.image }}
                  style={{ width: 60, height: 40, borderRadius: 8 }}
                />
              ) : (
                <InputIcon name="image" />
              )}
              <InputValue>
                {formData.image ? 'Imagem selecionada' : 'Escolher imagem'}
              </InputValue>
            </InputPressable>

            <Label>Fonte</Label>
            <Input
              value={formData.source}
              onChangeText={text => updateField('source', text)}
              placeholder="Ex: G1, Site Oficial"
              placeholderTextColor="#9CA3AF"
            />

            <SubmitButton activeOpacity={0.9} onPress={handleSubmit} disabled={loading}>
              <SubmitText>
                {loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Criar Notícia')}
              </SubmitText>
            </SubmitButton>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default AdminCreateNews;