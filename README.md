# SPORT CARE MOBILE STARTER GUIDE

## Step 0: Install dependencies

```sh
npm install
```

## Step 1: Start Metro

First, you will need to start Metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies."

```sh
npm start
```

## Step 2: Start your application

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

```sh
npm run android
```

### Environment Variables change

If you change your environment variables, you will need to reset your cache and restart Metro Bundler.

```sh
npm run start:reset
```

## Generate debug APK

First of all, create the bundle file:

```
yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

Then go to android folder :

```
cd android
```

Then run the following command to generate the debug apk :

```
./gradlew assembleDebug
```

You APK is generated in the android/app/build/outputs/apk/debug
