![Logo Passa Bola](./assets/logo.png)

# 📱 Passa a Bola App

O **Passa Bola App** é um aplicativo desenvolvido com [Expo](https://expo.dev) que tem como objetivo facilitar o gerenciamento de campeonatos, rachas e a divulgação de notícias relacionadas ao **futebol feminino**.  
Com ele, usuários podem acompanhar eventos, partidas, informações relevantes e se manter conectados ao cenário esportivo feminino.

### 🔗 Links úteis

- 🎨 [Protótipo no Figma](https://www.figma.com/design/DgQlRYl27zFH0SXp0i4CQp/Passa-a-Bola---Sprint?node-id=4-2&p=f&t=fWhvcgczrGM4dWVX-0)

---
## 📦 Pré-requisitos

Antes de iniciar, verifique se você possui as seguintes versões instaladas:

- **Node.js**: v18.x ou superior  
- **npm**: v9.x ou superior  

---

## 🚀 Como começar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o aplicativo:

   ```bash
   npm start
   ```

No terminal, você encontrará opções para abrir o app em:

- [Build de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/)
- [Emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Simulador iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), um sandbox limitado para testar o app.

---

## 🔄 Resetar o projeto

Se precisar reiniciar o projeto com uma estrutura limpa, rode:

```bash
npm run reset-project
```

Esse comando move o código inicial para o diretório **app-example** e cria uma pasta **app** em branco.

---

## 📖 Saiba mais

- [Documentação do Expo](https://docs.expo.dev/): fundamentos e tópicos avançados.  
- [Tutorial passo a passo](https://docs.expo.dev/tutorial/introduction/): aprenda construindo um app completo para Android, iOS e Web.  

---

## 🐳 Executando com Docker

Este projeto também pode ser executado em um container **Docker**, simplificando a configuração do ambiente.

### Passos

1. Certifique-se de ter [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados.

2. No terminal, na pasta onde está o `docker-compose.yml`, execute:

   ```bash
   docker-compose up --build
   ```

3. Isso irá construir a imagem e iniciar o container rodando o **Metro Bundler** do Expo.

4. Para acessar o app:

   - Abra o **Expo Go** no seu celular (na mesma rede do host do Docker).  
   - Escaneie o QR code exibido no terminal ou acesse no navegador:  
     `http://localhost:19002`

5. Para parar o container, execute:

   ```bash
   docker-compose down
   ```

### Notas

- O código do projeto é sincronizado via volume, então mudanças locais refletem automaticamente no app (hot reload).  
- Se não visualizar as atualizações, tente reiniciar o bundler limpando o cache:  

   ```bash
   docker exec -it <container-id> npx expo start -c
   ```

- As portas padrão do Expo (19000, 19001, 19002) estão expostas para conexão.

---

## 🔑 Login Admin

O aplicativo possui um usuário administrador para acessar a área restrita de gerenciamento:

- **Usuário:** `passabola@gmail.com`  
- **Senha:** `admin123`


---

## 👥 Integrantes
- Beatriz Cortez - RM561431
 
- Bruno Alves - RM563986
 
- Gabriel Augusto - RM564126
 
- Gustavo Moura - RM566190
 
- Pedro Henrique - RM563281

---