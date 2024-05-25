import {createStackNavigator} from '@react-navigation/stack';
import Registration from '../screens/Registration';
import Login from '../screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {ProfileScreen} from '../screens/ProfileScreen';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import React from 'react';
import {AuthRepo} from '../services/AuthRepo';
import {Storage} from '../services/Storage';
import Update from '../screens/Update';
import {HomeScreen} from '../screens/Home';
import UploadFiles from '../screens/UploadFiles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductScreen from '../screens/ProductScreen';
import NewScreen from '../screens/NewScreen';
import {ContextApi} from '../screens/ContextApi';
import ContextApi1 from '../screens/ContextApi1';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
//naviate
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ContextApi" component={ContextApi} />
      <Stack.Screen name="ContextApi1" component={ContextApi1} />
      <Stack.Screen name="NewScreen" component={NewScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="UploadFiles" component={UploadFiles} />
    </Stack.Navigator>
  );
};
const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Update" component={Update} />
    </Stack.Navigator>
  );
};
//yeah walakya ha ok
const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            if (route.name === 'User') {
              let icona = focused ? 'user' : 'user-o';
              return (
                <FontAwesome name={icona} size={30} style={{color: 'black'}} />
              );
            }
            return <Icon name={iconName} size={30} style={{color: 'black'}} />;
          },
        };
      }}>
      <Tab.Screen
        name="Home"
        component={AppStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="User"
        component={UserStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
const Router = () => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.auth);
  const [loading, setloading] = useState(true);
  React.useEffect(() => {
    (async () => {
      const token = await Storage.getToken();
      if (token) {
        dispatch(AuthRepo.Update(token));
      }

      setTimeout(() => {
        setloading(false);
      }, 2000);
    })();
  }, []);
  return (
    <NavigationContainer>
      {isLoggedIn ? BottomTabBar() : AuthStack()}
    </NavigationContainer>
  );
};
export default Router;
//kiya toh h
