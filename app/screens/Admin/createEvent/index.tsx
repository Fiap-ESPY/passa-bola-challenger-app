import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Switch
} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

import { RuleSection } from '@/model/championship';
import { ChampionshipInput, championshipService } from '@/services/championship/championshipService';
import { storageService } from '@/services/storage/storageService';
import { COLORS } from '@/theme/colors';
import { useRoute } from '@react-navigation/native';
import {
  AddButton,
  AddButtonText,
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
  RemoveButton,
  RuleInput,
  RuleItemRow,
  RuleSectionContainer,
  Screen,
  Segment,
  Segmented,
  SegmentText,
  SubmitButton,
  SubmitText,
  SwitchLabel,
  SwitchRow,
  TextArea,
  Title,
} from './styles';

const initialFormData = {
  title: '',
  type: 'campeonato' as 'racha' | 'campeonato',
  address: '',
  image: null,
  dateAndHour: new Date().toISOString(),
  isAvailable: true,
  isPublished: false,
  description: '',
  rules: [{ title: '', items: [''] }] as RuleSection[],
};

type FormData = Omit<ChampionshipInput, 'id'>;

const AdminCreateEvent = () => {
  const route = useRoute();
  const { championshipId } = (route.params as { championshipId?: string }) || {};
  const isEditMode = !!championshipId;

  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [loading, setLoading] = React.useState(isEditMode);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!isEditMode) return;

    const fetchChampionship = async () => {
      try {
        const eventToEdit = await championshipService.getChampionshipByDocId(championshipId);
        if (eventToEdit) {
          setFormData({
            title: eventToEdit.title,
            type: eventToEdit.type,
            address: eventToEdit.address,
            image: eventToEdit.image || null,
            dateAndHour: eventToEdit.dateAndHour,
            isAvailable: eventToEdit.isAvailable,
            isPublished: eventToEdit.type === 'racha' ? true : false,
            description: eventToEdit.description || '',
            rules:
              eventToEdit.rules && eventToEdit.rules.length > 0
                ? eventToEdit.rules
                : [{ title: '', items: [''] }],
          });
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do evento.');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchChampionship();
  }, [isEditMode, championshipId]);

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
    const currentDate = selectedDate || new Date(formData.dateAndHour);
    setShowDatePicker(Platform.OS === 'ios');
    updateField('dateAndHour', currentDate.toISOString());
  };

  const handleRuleSectionChange = (text: string, sectionIndex: number) => {
    const newRules = [...formData?.rules ?? []];
    newRules[sectionIndex].title = text;
    updateField('rules', newRules);
  };

  const handleRuleItemChange = (
    text: string,
    sectionIndex: number,
    itemIndex: number
  ) => {
    const newRules = [...formData.rules ?? []];
    newRules[sectionIndex].items[itemIndex] = text;
    updateField('rules', newRules);
  };

  const addRuleSection = () => {
    updateField('rules', [...formData?.rules ?? [], { title: '', items: [''] }]);
  };

  const removeRuleSection = (sectionIndex: number) => {
    const newRules = formData?.rules?.filter((_, index) => index !== sectionIndex);
    updateField('rules', newRules);
  };

  const addRuleItem = (sectionIndex: number) => {
    const newRules = [...formData?.rules ?? []];
    newRules[sectionIndex].items.push('');
    updateField('rules', newRules);
  };

  const removeRuleItem = (sectionIndex: number, itemIndex: number) => {
    const newRules = [...formData?.rules ?? []];
    newRules[sectionIndex].items = newRules[sectionIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    updateField('rules', newRules);
  };

  const handleMaxTeamsChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');

    if (numericValue === '') {
      updateField('maxTeams', undefined); 
      return;
    }

    let num = parseInt(numericValue, 10);

    if (num > 32) {
      num = 32;
      Alert.alert("Limite Atingido", "A quantidade máxima de equipes é 32.");
    }

    updateField('maxTeams', num);
  };

  const handleSubmit = React.useCallback(async () => {
    if (!formData.title.trim() || !formData.address.trim()) {
      Alert.alert('Erro', 'Por favor, preencha os campos de título e endereço.');
      return;
    }

    setLoading(true);

    try {
      const filteredRules = formData?.rules
        ?.map(section => ({
          title: section.title.trim(),
          items: section.items.map(item => item.trim()).filter(Boolean),
        }))
        ?.filter(section => section.title && section.items.length > 0);

      const eventDataPayload: ChampionshipInput = {
        ...formData,
        rules: filteredRules,
      };

      if (isEditMode) {
        await championshipService.updateChampionship(championshipId, eventDataPayload);
        Alert.alert('Sucesso', 'Evento atualizado com sucesso!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        await championshipService.addChampionship(eventDataPayload);
        Alert.alert('Sucesso', 'Evento criado com sucesso!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao salvar o evento.');
    } finally {
      setLoading(false);
    }
  }, [formData, isEditMode, championshipId]);

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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        >
          <Title>{isEditMode ? 'Editar Evento' : 'Cadastrar Evento'}</Title>
          <Form>
            <Label>Título</Label>
            <Input
              value={formData.title}
              onChangeText={text => updateField('title', text)}
              returnKeyType="next"
              placeholder="Ex: Copa Passa a Bola - 5ª edição"
              placeholderTextColor="#9CA3AF"
            />

            <Label>Imagem de Capa (Opcional)</Label>
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

            <Label>Tipo</Label>
            <Segmented>
              <Segment
                activeOpacity={0.8}
                $active={formData.type === 'campeonato'}
                onPress={() => updateField('type', 'campeonato')}
              >
                <SegmentText $active={formData.type === 'campeonato'}>
                  Campeonato
                </SegmentText>
              </Segment>
              <Segment
                activeOpacity={0.8}
                $active={formData.type === 'racha'}
                onPress={() => updateField('type', 'racha')}
              >
                <SegmentText $active={formData.type === 'racha'}>
                  Racha
                </SegmentText>
              </Segment>
            </Segmented>

            <Label>Data e Hora</Label>
            <InputPressable onPress={() => setShowDatePicker(true)}>
              <InputIcon name="calendar" />
              <InputValue>
                {new Date(formData.dateAndHour).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </InputValue>
            </InputPressable>

            {showDatePicker && (
              <DateTimePicker
                value={new Date(formData.dateAndHour)}
                mode="datetime"
                display="default"
                onChange={onChangeDate}
                locale="pt-BR"
              />
            )}

            <Label>Endereço</Label>
            <Input
              value={formData.address}
              onChangeText={text => updateField('address', text)}
              placeholder="Ex: Ginásio do Maracanãzinho, RJ"
              placeholderTextColor="#9CA3AF"
            />

            <Label>Quantidade total de equipes</Label>
            <Input
              value={formData.maxTeams ? String(formData.maxTeams) : ''}
              onChangeText={handleMaxTeamsChange}
              placeholder="Ex: 16"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />

            <Label>Descrição</Label>
            <TextArea
              value={formData.description}
              onChangeText={text => updateField('description', text)}
              multiline
              numberOfLines={4}
              placeholder="Descreva os detalhes do evento..."
              placeholderTextColor="#9CA3AF"
            />

            <Label>Regras</Label>
            {formData?.rules?.map((section, sectionIndex) => (
              <RuleSectionContainer key={sectionIndex}>
                <RuleItemRow>
                  <RuleInput
                    placeholder="Título da Seção (ex: Composição dos Times)"
                    placeholderTextColor="#9CA3AF"
                    value={section.title}
                    onChangeText={text =>
                      handleRuleSectionChange(text, sectionIndex)
                    }
                  />
                  <RemoveButton onPress={() => removeRuleSection(sectionIndex)}>
                    <FontAwesome name="trash" size={20} color={COLORS.red} />
                  </RemoveButton>
                </RuleItemRow>

                {section.items.map((item, itemIndex) => (
                  <RuleItemRow key={itemIndex}>
                    <RuleInput
                      placeholder="Descrição da regra"
                      placeholderTextColor="#9CA3AF"
                      value={item}
                      onChangeText={text =>
                        handleRuleItemChange(text, sectionIndex, itemIndex)
                      }
                    />
                    <RemoveButton
                      onPress={() => removeRuleItem(sectionIndex, itemIndex)}
                    >
                      <FontAwesome
                        name="minus-circle"
                        size={20}
                        color={COLORS.red}
                      />
                    </RemoveButton>
                  </RuleItemRow>
                ))}
                <AddButton onPress={() => addRuleItem(sectionIndex)}>
                  <FontAwesome name="plus" size={14} color={COLORS.white} />
                  <AddButtonText>Adicionar Item</AddButtonText>
                </AddButton>
              </RuleSectionContainer>
            ))}
            <AddButton onPress={addRuleSection}>
              <FontAwesome name="plus" size={14} color={COLORS.white} />
              <AddButtonText>Adicionar Seção de Regras</AddButtonText>
            </AddButton>

            <SwitchRow>
              <SwitchLabel>Evento disponível para visualização</SwitchLabel>
              <Switch
                trackColor={{ false: '#767577', true: COLORS.blue }}
                thumbColor={formData.isAvailable ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={value => updateField('isAvailable', value)}
                value={formData.isAvailable}
              />
            </SwitchRow>

            <SubmitButton activeOpacity={0.9} onPress={handleSubmit} disabled={loading}>
              <SubmitText>
                {loading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Criar Evento')}
              </SubmitText>
            </SubmitButton>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default AdminCreateEvent;