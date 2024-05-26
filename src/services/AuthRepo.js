import {Alert} from 'react-native';
import {Auth_Action_Type} from '../redux/AuthReducerr';
import {Storage} from './Storage';

export class AuthRepo {
  static register(data) {
    return async dispatch => {
      try {
        if (data.email === '' || data.password === '') {
          throw new Error('fill all details');
        }
        dispatch({type: Auth_Action_Type.LOGIN_REQUEST});
        const call = await fetch(
          'http://192.168.0.106:8000/api/user/register',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          },
        );
        if (!call.ok) {
          throw new Error('registration failed');
        }

        const res = await call.json();

        Alert.alert('registration successful');

        await Storage.setToken({
          token: res?.token,
        });

        dispatch({
          type: Auth_Action_Type.LOGIN_REQUEST_SUCCESS,
          payload: {
            token: res?.token,
          },
        });
      } catch (error) {
        Alert.alert(error.message);
        dispatch({
          type: Auth_Action_Type.LOGIN_REQUEST_FAILED,
        });
      }
    };
  }

  static login(data) {
    return async dispatch => {
      try {
        if (data.email === '' || data.password === '') {
          throw new Error('fill all details');
        }
        dispatch({type: Auth_Action_Type.LOGIN_REQUEST});
        const call = await fetch('http://192.168.0.106:8000/api/user/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });

        if (!call.ok) {
          throw new Error('login failed');
        }

        const res = await call.json();

        await Storage.setToken({
          token: res?.token,
        });

        dispatch({
          type: Auth_Action_Type.LOGIN_REQUEST_SUCCESS,
          payload: {
            token: res?.token,
          },
        });
        Alert.alert('login successful');
      } catch (error) {
        Alert.alert(error.message);
        dispatch({
          type: Auth_Action_Type.LOGIN_REQUEST_FAILED,
        });
      }
    };
  }
  static logout() {
    return async dispatch => {
      try {
        await Storage.clearToken();
        dispatch({type: Auth_Action_Type.LOGOUT});
      } catch {}
    };
  }

  //i1-api
  //i2-daddieskart forntend
  //i3-seller.dadd
  //AWS -1.EC2,S3,lambda,db
  //EC2-forntend-host-ngnix
  //EC2-server-host-pm2
  static Update(token) {
    return async dispatch => {
      try {
        dispatch({type: Auth_Action_Type.UPDATE_USER, payload: {token}});
      } catch {}
    };
  }

  //ok ok
  //   static register(userregistration) {
  //     return async dispatch => {
  //       try {
  //         if (
  //           userregistration.username.trim() === '' ||
  //           userregistration.email.trim() === '' ||
  //           userregistration.password.trim() === ''
  //         ) {
  //           throw new error('fill all details');
  //         }
  //         const users = await Storage.getUser();
  //         if (users == null) {
  //           Storage.setUser([userregistration]);
  //         } else {
  //           Storage.setUser([...users, userregistration]);
  //         }
  //         Alert.alert('registration successfull');
  //       } catch (error) {
  //         Alert.alert(error.message);
  //       }
  //     };
  //   }
}
//"test16",
//  "email": "test16@gmail.com",
//  "password": "test16123" haan
