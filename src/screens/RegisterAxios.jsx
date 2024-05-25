import {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';

const RegisterAxios = () => {
  const [userRegistration, setUserRegistration] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.106:8000/api/user/register',
        {
          username: userRegistration.username,
          email: userRegistration.email,
          password: userRegistration.password,
        },
      );
      const responseData = await response.data;
      if (username === '' || email === '' || password === '') {
        Alert.alert('fill all details');
      }

      if (responseData.ok) {
        Alert.alert('Registration Successfull');
      } else {
        const errorData = await response.data;
        Alert.alert('registraion failed', errorData);
      }
    } catch (error) {
      Alert.alert('failed');
    }
  };
  const onChange = (fieldId, value) => {
    setUserRegistration({
      ...userRegistration,
      [fieldId]: value,
    });
  }; //net slow h kya? r u there?m ek sec ab check kro nhi hua?
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
      <TouchableOpacity onPress={handleRegistration}>
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
    </View>
  );
};
//ha toh mtlb jb register kiya to vhi data store hojayega phir bar bar login ya
export default RegisterAxios;

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
