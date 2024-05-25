import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthRepo} from '../services/AuthRepo';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('http://192.168.0.106:8000/api/user/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({email, password}),
  //     });

  //     if (response.ok) {
  //       const {token} = await response.json();

  //       Alert.alert('Login Successful');
  //     } else {
  //       const {message} = await response.json();
  //       Alert.alert('Login Failed', message);
  //     }
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     Alert.alert('Login Failed', 'Invalid username or password');
  //   }
  // };
 
  const submithandler = () => {
    dispatch(AuthRepo.login({email, password}));
  };
  //kaha araha hain error y jb register ya login kr rhe h to nhi ho rha
  return (
    <View>
      <Text style={Styles.btn}>Login</Text>
      <View style={{marginTop: 200}}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={Styles.TextInput}></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={Styles.TextInput}></TextInput>
      </View>
      <TouchableOpacity onPress={submithandler}>
        <Text
          style={{
            marginTop: 50,
            textAlign: 'center',
            borderRadius: 10,
            borderWidth: 1,
            width: '40%',
            marginLeft: 120,
            fontSize: 20,
            color: 'black',
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
const Styles = StyleSheet.create({
  TextInput: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  btn: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20,
  },
});
