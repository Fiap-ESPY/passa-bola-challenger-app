# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## Running with Docker

This project can also be run inside a Docker container to simplify the development environment setup.

### Steps to run with Docker

1. Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

2. From the terminal, in the folder where your `docker-compose.yml` is located, run:

   ```bash
   docker-compose up --build
   ```

3. This will build the image and start the container running Expo's Metro Bundler.

4. To access the app:

   - Open the Expo Go app on your mobile device (on the same network as the Docker host).
   - Scan the QR code shown in the terminal or open the Expo web interface in your browser at:  
     `http://localhost:19002`

5. To stop the container, run:

   ```bash
   docker-compose down
   ```

### Notes

- Your project code is synced via a volume with the container, so any changes made locally will reflect automatically in the running app (hot reload).
- If you don’t see updates, try restarting the bundler with a cleared cache inside the container:

   ```bash
   docker exec -it <container-id> npx expo start -c
   ```

- The standard Expo ports (19000, 19001, 19002) are exposed to facilitate connection.

---
