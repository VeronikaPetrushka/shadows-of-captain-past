import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MusicProvider } from './appSource/shadowsHelpers/CaptainMusic';

import {
  ShadowsAnimationRoute,
  AboutCaptainRoute,
  CaptainTalesRoute,
  ReadCaptainTaleRoute,
  ReadCaptainSubTaleRoute,
  CaptainTaleMapRoute,
  CaptainSettingsRoute
} from './appSource/shadowsHelpers/shadowRoutes';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

      return (
        <MusicProvider>
            <NavigationContainer>
                  <Stack.Navigator initialRouteName={"ShadowsAnimationRoute" }>    
                        <Stack.Screen 
                              name="ShadowsAnimationRoute" 
                              component={ShadowsAnimationRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="AboutCaptainRoute" 
                              component={AboutCaptainRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="CaptainTalesRoute" 
                              component={CaptainTalesRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="ReadCaptainTaleRoute" 
                              component={ReadCaptainTaleRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="ReadCaptainSubTaleRoute" 
                              component={ReadCaptainSubTaleRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="CaptainTaleMapRoute" 
                              component={CaptainTaleMapRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="CaptainSettingsRoute" 
                              component={CaptainSettingsRoute} 
                              options={{ headerShown: false }} 
                        />
                  </Stack.Navigator>
                  </NavigationContainer>    
        </MusicProvider>
    );
};

export default App;
