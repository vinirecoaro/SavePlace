import {router, useFocusEffect, useGlobalSearchParams, useLocalSearchParams} from 'expo-router'
import {StyleSheet} from 'react-native'
import {FloatingAction} from 'react-native-floating-action'
import { Container } from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useEditLocalization } from '@/contexts/editLocalization'
import MapView, { Marker, MapPressEvent, LatLng, Region } from 'react-native-maps';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import Localization from '@/model/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapScreen(){

  const { setEditLocalization } = useEditLocalization();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);
  const {latitude, longitude} = useLocalSearchParams()
  const [locs, setLocs] = useState<Array<Localization>>([])

  const actions = [
    {
      text: 'Adicionar localização',
      icon: <Icon name="plus" size={20} color="#fff" />,
      name: 'bt_add_loc',
      position: 1,
    },
  ];

  const handleAddLoc = (name?: string) => {
    if (name) {
      setEditLocalization(false)
      router.push('/addEdit')
    } else {
      console.log('Falha ao iniciar tela de inclusão de nova localização');
    }
  };

  useEffect(() => {
    (async () => {
        let locationPermission = await Location.requestForegroundPermissionsAsync();
        let { status } = locationPermission;
        // let status = locationPermission.status;
        if (status !== 'granted') {
            console.log('A permissão foi negada!');
        } else {
            let location = await Location.getCurrentPositionAsync();
            setLocation(location);
            if (mapRef.current) {
              if(latitude != null && longitude != null){
                const region: Region = {
                  latitude: parseFloat(latitude.toString()),
                  longitude: parseFloat(longitude.toString()),
                  latitudeDelta: 0.01,  // Ajuste o zoom
                  longitudeDelta: 0.01,  // Ajuste o zoom
                };
                mapRef.current.animateToRegion(region, 1000); // 1000 ms para animar
              }else{
                const region: Region = {
                  latitude: location!.coords.latitude ?? 0,
                  longitude: location!.coords.longitude ?? 0,
                  latitudeDelta: 0.01,  // Ajuste o zoom
                  longitudeDelta: 0.01,  // Ajuste o zoom
                };
                mapRef.current.animateToRegion(region, 1000); // 1000 ms para animar
              }
              
            }
        }
    })();
  }, [latitude, longitude]);

  useFocusEffect(
    useCallback(() => {
        getLocations();
    }, []) // Dependências vazias para garantir que só roda ao focar na tela
  );

    const getLocations = async () => {
      let locsList : Localization[] = []
        const locsStorage = await AsyncStorage.getItem('markers');
        if (locsStorage){
            locsList = JSON.parse(locsStorage)
        }
        setLocs(locsList)
    }

  return (
    
    <Container>
      <MapView 
      style={styles.locationMapView}
      ref={mapRef}
      initialRegion={{
        latitude: location?.coords.latitude ?? 0,
        longitude: location?.coords.longitude ?? 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }}
      showsUserLocation
      >
        {locs.map( loc => (
          <Marker 
            coordinate={{ latitude: parseFloat(loc.latitude), longitude: parseFloat(loc.longitude)}}
            pinColor={loc.pinColor}
            title={loc.name}
          />
        ))}

      </MapView>
      <FloatingAction 
        color='#f4511e' 
        overrideWithAction={true}
        actions={actions}
        onPressItem={handleAddLoc}
      />
    </Container>
    
  )
}

const styles = StyleSheet.create({
  locationMapView: {
      width: "100%",
      height: "100%",
  }
});
  