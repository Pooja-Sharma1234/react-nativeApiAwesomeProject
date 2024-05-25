import React, {useState} from 'react';
import {View, Button, Image, Alert, TouchableOpacity, Text} from 'react-native';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

const UploadFiles = () => {
  const [avatarSource, setAvatarSource] = useState(null);

  const selectImage = () => {
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
        uploadImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async uri => {
    try {
      const data = new FormData();
      data.append('avatar', {
        uri: uri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });

      const res = await fetch('http://192.168.0.106:8000/api/user/profile', {
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const dta = await res.json();
      Alert.alert('Success', 'Image uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //chliye yearror bad main dekte hian abhi soten hain tj kl dophar main dekhenge ok ok krdu bnd?haan tj ok bye bye
  return (
    <View style={{flex: 1}}>
      {avatarSource && (
        <Image
          source={avatarSource}
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
          }}
        />
      )}

      <View>
        <TouchableOpacity onPress={selectImage}>
          <Text>hllo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadFiles;
//aagye yes tj ku kisne bulaya aapko kisne permission di hmare laptop m ghusne ki main apse baat nahi krne aya hun main hamare tj se baat karni hain
//aap bhul rhe h aap yha kam krne aaye ho ok tj
//isme uri bhi deni pdti h?
