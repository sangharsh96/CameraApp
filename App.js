/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CameraScreen from './src/CameraScreen';
import UpdatedCamera from './src/Screen/UpdatedCamera';
import CameraComponent from './src/Screen/CameraComponent';
//  import {NavigationContainer} from '@react-navigation/native';
//  import {createNativeStackNavigator} from '@react-navigation/native-stack';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // const Stack = createNativeStackNavigator();

  return (
    // <NavigationContainer>
    //   <SafeAreaView style={backgroundStyle}>
    //     <StatusBar
    //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //       backgroundColor={backgroundStyle.backgroundColor}
    //     />
    //     <ScrollView
    //       contentInsetAdjustmentBehavior="automatic"
    //       style={backgroundStyle}>
    //       {/* <CameraScreen/> */}
    //       {/* <CameraComponent/> */}
    //       {/* <UpdatedCamera /> */}
    //       <Stack.Navigator initialRouteName="Home">
    //         <Stack.Screen
    //           name="Home"
    //           component={UpdatedCamera}
    //           //options={{headerShown: false}}
    //         />
    //       </Stack.Navigator>
    //     </ScrollView>
    //   </SafeAreaView>
    // </NavigationContainer>
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <UpdatedCamera />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
