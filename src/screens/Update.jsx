import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
} from 'react-native';
import {AuthRepo} from '../services/AuthRepo';
import {useDispatch} from 'react-redux';
import {Storage} from '../services/Storage';
import {launchImageLibrary} from 'react-native-image-picker';

const Update = ({route}) => {
  const Navigation = useNavigation();
  // const {username:uname,password} = route.params;
  const [avatarSource, setAvatarSource] = useState(null);
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [img, setImg] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(route.params.username);
    setNewPassword(route.params.password);
    setAvatarSource({
      uri: `http://192.168.0.106:8000/${route.params.image}`,
    });
  }, []);
  const handleUpdatePassword = async () => {
    const getToken = await Storage.getToken();

    const data = new FormData();
    data.append('username', username);
    data.append('password', newPassword);
    data.append('avatar', {
      uri: avatarSource.uri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });

    try {
      const response = await fetch('http://192.168.0.106:8000/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: getToken?.token,
        },
        body: data,
      });

      if (response.ok) {
        Navigation.goBack();
      } else {
        const {message} = await response.json();
        Alert.alert('Password Update Failed', message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Password Update Failed');
    }
  };

  const uploadhandler = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response);
        const source = {uri: response.assets[0].uri};
        setAvatarSource(source);
        // uploadImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={uploadhandler}
        style={{
          height: 100,
          width: 100,
          borderWidth: 1,
          borderRadius: 100,
          alignSelf: 'center',
        }}>
        <Image
          source={avatarSource}
          style={{
            width: 80,
            height: 80,
            marginTop: 10,

            borderWidth: 1,
            borderRadius: 80,
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>

      <TextInput
        placeholder="UserName"
        value={username}
        onChangeText={setUsername}
        style={Styles.TextInput}
      />

      <TextInput
        placeholder="NewPassword"
        value={newPassword}
        onChangeText={setNewPassword}
        style={Styles.TextInput}
      />
      <TouchableOpacity onPress={handleUpdatePassword}>
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
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Update;
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
