import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthRepo} from '../services/AuthRepo';

const Registration = () => {
  const dispatch = useDispatch();
  const [userRegistration, setUserRegistration] = useState({
    username: '',
    email: '',
    password: '',
  });
  const Navigation = useNavigation();

  const onChange = (fieldId, value) => {
    setUserRegistration({
      ...userRegistration,
      [fieldId]: value,
    });
  };
  const submithandler = () => {
    dispatch(AuthRepo.register(userRegistration));
  };

  const goToLogin = () => [Navigation.navigate('Login')];
  return (
    <View>
      <Text style={Styles.btn}>Sign Up</Text>
      <View style={{marginTop: 200}}>
        <TextInput
          placeholder="Username"
          value={userRegistration.username}
          onChangeText={text => onChange('username', text)}
          style={Styles.TextInput}></TextInput>
        <TextInput
          placeholder="Email"
          value={userRegistration.email}
          onChangeText={text => onChange('email', text)}
          style={Styles.TextInput}></TextInput>
        <TextInput
          placeholder="Password"
          value={userRegistration.password}
          onChangeText={text => onChange('password', text)}
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
          SignUp
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={Styles.link}>Already Registered? Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Registration;
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
  link: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
