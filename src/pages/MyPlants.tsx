import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';
import Header from '../components/Header';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../../styles/fonts';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Load from '../components/Load';

import waterDrop from '../assets/waterdrop.png';

export default function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>(
    'Parece que não ha atividades agendadas para você por enquanto',
  );

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}`, [
      {
        text: 'Não 🙏',
        style: 'cancel',
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants(oldData =>
              oldData.filter(item => item.id !== plant.id),
            );
          } catch (error) {
            Alert.alert('Não foi possível remover! 😢');
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageDate() {
      const plantsStorage = await loadPlant();

      if (plantsStorage.length > 0) {
        const nextTime = formatDistance(
          new Date(plantsStorage[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: pt },
        );

        setNextWatered(
          `Não esqueça de regar a ${plantsStorage[0].name} à aproximadamente ${nextTime}`,
        );
      }

      setMyPlants(plantsStorage);
      setLoading(false);
    }

    loadStorageDate();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterDrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}></Text>

        <FlatList
          data={myPlants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
