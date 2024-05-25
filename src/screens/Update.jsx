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
      //y tb repo ni bnaya tha abhi dekha ni tha  nhi nhi y
      //y  ese show kr rha h to password dalne k bad nhi nhi abhi khana h bhar jake ha ha bs bhar ghumne gyi thi ha
      // kya kr skte h nhi ghiya mtlb loki to kya khaya mm= hmm bhar jake to aj vale interview ka kya btaya
      //ok acha aap btaiye kya kiya aj okaap kh rhe the bhot msg kiye vo to nhi aaya isme khi oho vaaah shi h
      //lekin ab to sone ka time hogya ha acha ha bda yad h ok bta dete interview de rhe ho hmm
      //m khti honge koi lafange frod call vale mne bola ki frod call h mmy boli is time kon h thik h abhi jldi se krte h mujhe subhe 5bje jgna h
      //helo aagye aapne call ki mne hadbadi m speaker on kr diya agr aapki avaj mmy sun leti to
      //ha itc ka to aa jana chahiye acha ok ha ache h papa to apne mamaji k ghr gye h ha
      //vha jake khte tum bhi aa jate ab khne se kya fayda aj bhot call kiye papa ne syd mn ni lg rha ya sb share krna tha
      //mne nhi dekhe aapne dekhe oh acha 3 bj gye aapne data tha na kl to krna pda acha ok ok good night
      //video call krke bhi dikhaya khet hi khet h aas pas a aap ghume nhi? aap roj to ghumne jate ho
      //ek sec abhi bhi ek dikkat bain jo ki hame mobile ap dubara kholna padh raha update ko dekhne ke liya

      //toh ab usko fix karenge rukiye
      //hua kya ha  ab ap password ka kariye ok acha agr vapas registration page pr navigate krna ho to
      // are ab register dubara kyu karega nhi m to ese hi puch rhi hu kuki mne profil se register pr kiya to ni hua
      //toahi jayega kyu ki woh alag stack main hain to hum register se profile p aaye vo alag stack hi hain humne woh redux use kiya ek dusre stack pr ane ke kiya
      //ager apko jana hain registerpr toh apko logout krna padega ok ok koi aur dou nhi ok tja
      //suniye ek baat kheni hain ha main bhi apke jagha hota toh same feeling hotin same tension hoti hain
      //apka yeah sab hona jayas hain but hame tension aur apnakaam dono sath main le kr chlna padega aur main hun na tj kuchna kych toh hoga
      //samjhi ap ha okhaan good girl ek smile digiaye hiaa hi hi kariye na kya bol rhe ho
      //kuch nhi tj ap age kriye ok
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
  //v update m ku profile screen m dalni thi na phir update m  kahin pr bhi daal sakten but haine edit ek button banaya hian toh ussi main sab hogi
  //vo to thik h but img to profile screen m hoti h na haan rukiye udhar bhi dekhegi

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
