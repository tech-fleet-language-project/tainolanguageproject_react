import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import Colors  from '../constants/Colors';
import SplashScreen from 'react-native-splash-screen';
import Login from '../screens/login';


export function Splash() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark.color : Colors.light.color,
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={[styles.containerSplash, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Login />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  containerSplash: {
    flex: 1,
  },
});

