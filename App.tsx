/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import Registration from './src/screens/Registration';
import Login from './src/screens/Login';
import Update from './src/screens/Update';

import {Provider} from 'react-redux';
import Router from './src/router/Router';
import store from './src/router/store';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
export default App;

// const [backgroundColor, setBackgroundColor] = useState('white');
// const [userData, setUserData] = useState([]);

// const handleClick = () => {
//   // Toggle background color between white and blue
//   setBackgroundColor(prevColor => (prevColor === 'white' ? 'blue' : 'white'));
// };

// return (
//   <View style={styles.container}>
//     <TouchableOpacity onPress={handleClick} style={styles.button}>
//       <Text style={[styles.buttonText, {backgroundColor}]}>Click Me</Text>
//     </TouchableOpacity>
//   </View>
// );

// useEffect(() => {
//   // fetchUserData();
// }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('http://192.168.0.106:8000/api/user/');
//       if (!response) {
//         throw new Error('Network response was not ok');
//       }
//       //yha apply kr rhi thi m nhi bs yhi fetch m dala tha but nhi hua to mne phir y dal k jo postman m dalte h
//       const userData = await response.json();
// //ok ok vo
//       console.log(userData);
//       setUserData(userData);
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   return (
//     <View>
//       {/* {userData.slice(1, 4)} */}
//       {/* <Text>{JSON.stringify(userData?.slice(1, 3), null, 1)}</Text> */}
//       <Text>{JSON.stringify(userData, null, 1)}</Text>
//     </View>
//   );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'lightgray',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
