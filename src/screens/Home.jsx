import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthRepo} from '../services/AuthRepo';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import {blue} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import {useNavigation} from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(AuthRepo.logout());
  // }, []);
  //iski wajaha se horaha th tj logout ho ja raha tha ab hogya?
  //haan ab ap age kariye jo kr rahin thin m  kuch y uuser vala profile p jana chahiye
  const navigateList = [
    {
      routerName: 'PROFILE',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/image.png')}
        style={{width: '100%', height: '100%', flex: 1}}
      />
      <View style={{position: 'absolute', flexDirection: 'row'}}>
        <Image
          source={require('../assets/images/shop.jpg')}
          style={{
            height: 50,
            width: 50,
            marginTop: 40,

            borderRadius: 15,
            borderWidth: 0.1,
            position: 'absolute',
            marginLeft: 20,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            fontSize: 20,
            marginTop: 40,
            marginLeft: 80,
            color: '#fff',
            fontStyle: 'italic',
          }}>
          Shopy
        </Text>
      </View>

      <Text
        style={{
          position: 'absolute',
          fontSize: 60,
          marginTop: 90,
          margin: 50,
          color: '#000',
          fontWeight: 500,
        }}>
        Please keep your eyes on
        <Text style={{color: 'gold'}}> trending item</Text> at
        <Text style={{color: 'gold'}}>-Shopy</Text>
      </Text>
      <View
        style={{
          position: 'absolute',
          marginTop: '150%',
          marginLeft: 40,
        }}>
        <TouchableOpacity
          style={{
            width: 120,
            height: 45,
            backgroundColor: '#fff',
            borderRadius: 10,
            borderWidth: 0.1,
          }}
          onPress={() => {
            navigation.navigate('ProductScreen');
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 24,
              textAlign: 'center',
              marginTop: 5,
              fontWeight: 'bold',
            }}>
            Explore!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
          }}
          onPress={() => {
            navigation.navigate('NewScreen');
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 24,
              alignItems: 'center',
              marginTop: '80%',
              marginLeft: 20,
              fontWeight: 'bold',
            }}>
            Press
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={
            {
              // position: 'absolute',
            }
          }
          onPress={() => {
            navigation.navigate('ContextApi');
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 24,
              alignItems: 'center',

              fontWeight: 'bold',
            }}>
            Press1
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
