import { EditLocalizationProvider, useEditLocalization } from '@/contexts/editLocalization';
import { LocalizationProvider } from '@/contexts/localization';
import { router, Stack } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Layout() {

  return (
    <EditLocalizationProvider>
      <LocalizationProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          title: 'Mapa',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#FFF',

        }}>
          <Stack.Screen 
          name='index' 
          options={
            { title : 'Mapa',
              headerRight:() => (
                <View>
                  <TouchableOpacity onPress={() => router.push('/list')}>
                      <Icon name="list" size={20} color="#FFF" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                </View>
              )
            }
          }
          />
          <Stack.Screen name='add'/>
          <Stack.Screen name='list' options={{title : 'Lista de Localizações'}}/>
        </Stack>
      </LocalizationProvider>
    </EditLocalizationProvider>
    
      )
}

