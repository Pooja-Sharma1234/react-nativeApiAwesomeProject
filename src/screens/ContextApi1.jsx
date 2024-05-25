import React, {createContext} from 'react';
import {Text, View} from 'react-native';
import {myContext} from './ContextApi';

const ContextApi1 = () => {
  return (
    <myContext.Consumer>
      {myname => {
        return (
          <View>
            <Text>{myname}</Text>
          </View>
        );
      }}
    </myContext.Consumer>
  );
};

export default ContextApi1;
