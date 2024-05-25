import {Alert} from 'react-native';
import {Auth_Action_Type} from '../redux/AuthReducerr';
import {Storage} from './Storage';

export class AuthRepo {
  //phele hmne datat liye fir usko api cakk main se baje diya backend main fir backend
  //nne hame token bahja phir token ko store kara kiya storage main ok
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
        //ab kse hhua pata nahi tj aapke aate hi error bhag jate h

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
  
  //aj hi join kiya ok itna jldi uth gye he ram ok to ab to ap protein k dabbe laoge
  //mostly lete h lelo to trainer bhi ok kya bola aapne weight gain krna h six pack
  //iski bhi tension hoti h kya acha dal roti hi thik h are join kiya h na to ab bhane nhi 
  ///ok y hi tha ha acha y 3 instance ku 
  
  //alag alag ku
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
//hello bde dino k bad mile acha tj ap hi kho jatin haain to aap dhund lete na haan//
//toh aj hum aws dekhenge tj ok
//phele toh yeah janata aws kikya jarurat hain aur isse hi kyu use kare ok
//call kr hi leten hain tj naah mera mn nhi h hihi but mera hain toh krta hun ap ear phone liyin
//acha aap khe to call ho or aapka mn na ho to nhi  bhot dadagiri h acha thik hain tj phir yahi baat hn

//aws yeah ekruko krlo ok hlo kya hlo m ku manu aapki bat
//ha services ki vjh se mtlb jse render m specific ha kha gye the ooohhhhh btaya bhi nhi  ha ha ku btaoge
//wow are first day or kitne smart ho aap fees bhi km krvali oho to aj kitna time first day bhi?
//nhi mtlb body kko aadat nhi hoti to aj so jao jldi din m soye?kitne bje gye


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

///acha tj ap se ek baat puchun ha
//unhone apse ek bar bhi baat kari thi kya is bare mai? nhi usne kha ki abhi time nhi h vo sb bat krne ka vo
//ap ne kya bola tha  mne call ki thi to cut krdi kuki vo meeting m thi phir ese hi hello bhja to
//khti ki mujhe pta h tu us bare m bat krna chahti h but abhi time nhi h vo aunty ki thodi tbiuyat thik nhi thi to usne bola ki abhi time nhi h
//fir usseke baad se nahi hui kl hi to hui y bt mne bola ki atleat mujhse normally to bt kr skti h
//to bs y hi sb hello hi hua mne aunty ka pucha jyda kuch bt nhi hui acha ok
//kya hua v kuch nahiayse hi pucha ki woh rotin hain but baat nahi krna chatin hain woh parenshan hain but baat nahi kr pa rahin hian
//ager pucho to keh detin sb thik hian but mujhe pata woh bahut kuch apne ander chupa rahin hian
//but main karun bhi toh kya karun unko bola milne ke liyatoh kuch na kuch naya a jata hian
//callkro us din last time aap kh rhe the ki usne bola ab hum bt nhi krenge phir aapne msg kiya tha kya
//hmm ldke jana jruri h y to btao m wtsp p msg krti hu aap to continue kro na chup ku hogye
