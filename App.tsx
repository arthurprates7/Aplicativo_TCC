import { StatusBar } from "expo-status-bar";
import React from 'react';


import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

import Main from "./src/Main";
import { View, ImageBackground,Platform,AppRegistry } from 'react-native';




export default function App() {

  
  return (

    <>
      <StatusBar style='inverted' />
    
        <View
          style={
            {
              flex: 1,
              paddingTop: getStatusBarHeight(),
              paddingBottom: getBottomSpace(),
            }
          }
        >
          <Main />
        </View>
    
    </>

  );

}
