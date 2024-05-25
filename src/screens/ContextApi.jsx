import {useNavigation} from '@react-navigation/native';
import React, {createContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
export const myContext = React.createContext();
export const ContextApi = () => {
  const navigation = useNavigation();
  return (
    <myContext.Provider value={'p'}>
      <ContextApi name={'pooja'} />
    </myContext.Provider>
  );
};
