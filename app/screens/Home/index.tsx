import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #1e90ff;
`;

const Button = styled.TouchableOpacity`
  background-color: #1e90ff;
  padding: 12px 24px;
  border-radius: 8px;
  margin-top: 16px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export default function Home() {
  return (
    <Container>
      <Title>Hello Styled Components 👋</Title>
      <Button>
        <ButtonText>Clique Aqui</ButtonText>
      </Button>
    </Container>
  );
}
