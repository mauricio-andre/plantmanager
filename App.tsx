import {
  Jost_400Regular,
  Jost_600SemiBold,
  useFonts,
} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_600SemiBold });

  // useEffect(() => {
  //   // Monitorado as notificações recebidas
  //   const subscription = Notifications.addNotificationReceivedListener(
  //     async notification => {
  //       const data = notification.request.content.data.plant as PlantProps;
  //       console.log(data);
  //     },
  //   );

  //   return () => subscription.remove();

  //   // async function notifications() {
  //   //   // Listar todas as notificações
  //   //   const data = await Notifications.getAllScheduledNotificationsAsync();
  //   //   console.log('################# Notificações agendadas ################');
  //   //   console.log(data)

  //   //   // Remover todas as notificações
  //   //   // await Notifications.cancelAllScheduledNotificationsAsync();
  //   // }

  //   // notifications();
  // }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Routes />
    </GestureHandlerRootView>
  );
}
