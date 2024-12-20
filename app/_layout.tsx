import { EditLocalizationProvider, useEditLocalization } from '@/contexts/editLocalization';
import { LocalizationProvider } from '@/contexts/localization';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserProvider from '@/store/UserStore';
import { LocalizationsListProvider } from '@/contexts/localizationsListContext';

export default function Layout() {

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <LocalizationsListProvider>
        <EditLocalizationProvider>
          <LocalizationProvider>
            <UserProvider>
              <Stack
              screenOptions={{
                headerShown: true,
                title: 'Login',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#FFF',

              }}>
                <Stack.Screen
                  name='index'
                  options={{
                    headerShown: false
                  }}  
                />
                <Stack.Screen 
                name='map' 
                options={
                  { title : 'Mapa',
                    headerRight:() => (
                      <View>
                        <TouchableOpacity onPress={() => router.push('/list')} testID="header-list-button">
                            <Icon name="list" size={20} color="#FFF" style={{ marginRight: 10 }} />
                          </TouchableOpacity>
                      </View>
                    )
                  }
                }
                />
                <Stack.Screen name='addEdit'/>
                <Stack.Screen name='list' options={{title : 'Lista de Localizações'}}/>
                <Stack.Screen name='register' options={{headerShown:false}}/>
              </Stack>
            </UserProvider>
          </LocalizationProvider>
        </EditLocalizationProvider>
      </LocalizationsListProvider>
    </ThemeProvider>
    
    
      )
}

