import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Update from './Update';
import {useNavigation} from '@react-navigation/native';
import {AuthRepo} from '../services/AuthRepo';
import {useEffect, useState} from 'react';
import {Storage} from '../services/Storage';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleProfile();
    });
    return () => unsubscribe();
  }, [navigation]);

  const logouthandler = () => {
    dispatch(AuthRepo.logout());
  };
  const handleProfile = async () => {
    const getToken = await Storage.getToken();

    try {
      const res = await fetch('http://192.168.0.106:8000/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: getToken.token,
        },
      });
      const ress = await res.json();

      setProfile(ress);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, height: '100%'}}>
      <View
        style={{
          backgroundColor: '#456576',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Text style={{fontSize: 20}}>ProfileScreen</Text>
        <TouchableOpacity
          onPress={() => {
            logouthandler();
          }}>
          <Text style={{fontSize: 20}}>LogOut</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View
          style={{
            height: 100,
            width: 100,
            borderWidth: 1,
            borderRadius: 100,
            alignSelf: 'center',
          }}>
          <Image
            style={{height: 100, width: 100}}
            source={{uri: `http://192.168.0.106:8000/${profile?.profileImg}`}}
          />
        </View>
      </TouchableOpacity>

      <View style={{marginTop: 100, justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* <Text>{JSON.stringify(profile)}</Text> */}

          <Text style={{marginLeft: 20, fontSize: 20}}>Name </Text>
          <Text style={{fontSize: 20}}>:</Text>
          <View
            style={{
              height: 40,
              width: '70%',
              borderRadius: 20,
              marginRight: 20,
            }}>
            <Text style={{marginLeft: 20, fontSize: 20}}>
              {profile.username}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{marginLeft: 20, fontSize: 20}}>Email </Text>
          <Text style={{fontSize: 20}}>:</Text>
          <View
            style={{
              height: 40,
              width: '70%',
              borderRadius: 20,
              marginRight: 10,
              marginLeft: 20,
            }}>
            <Text style={{marginLeft: 30, fontSize: 20}}>{profile.email}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Update', {
                username: profile.username,
                image: profile.profileImg,
                // password: profile.password,
              }); //ise kya ho rha hok ok phle password vala to only newpasword vala
            }}>
            <Text
              style={{
                // marginTop: 100,
                alignSelf: 'center',
                borderWidth: 1,
                width: 80,
                height: 30,
                borderRadius: 10,
                textAlign: 'center',
                fontSize: 20,
                color: 'black',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
