import {router} from 'expo-router'
import {StyleSheet} from 'react-native'
import {FloatingAction} from 'react-native-floating-action'
import { Container } from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useEditLocalization } from '@/contexts/editLocalization'
import MapView, { Marker, MapPressEvent, LatLng } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function MapScreen(){

  const { setEditLocalization } = useEditLocalization();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

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
      router.push('/add')
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
        }
    })();
  }, []);
  
  return (
    
    <Container>
      <MapView 
      style={styles.locationMapView}
      initialRegion={{
        latitude: location?.coords.latitude ?? 0,
        longitude: location?.coords.longitude ?? 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }}
      showsUserLocation
      >
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
  