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
  CaptainSettingsRoute,
  LeadershipQuoutesRoute,
  ReadLeadershipQuouteRoute,
  CaptainMirrorRoute,
  CaptainMirrorImageRoute,
  CaptainSavedSituationsRoute,
  CaptainJourneyRoute
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
                        <Stack.Screen 
                              name="LeadershipQuoutesRoute" 
                              component={LeadershipQuoutesRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="ReadLeadershipQuouteRoute" 
                              component={ReadLeadershipQuouteRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="CaptainMirrorRoute" 
                              component={CaptainMirrorRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="CaptainMirrorImageRoute" 
                              component={CaptainMirrorImageRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="CaptainSavedSituationsRoute" 
                              component={CaptainSavedSituationsRoute} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="CaptainJourneyRoute" 
                              component={CaptainJourneyRoute} 
                              options={{ headerShown: false }} 
                        />
                  </Stack.Navigator>
            </NavigationContainer>    
        </MusicProvider>
    );
};

export default App;
