import AsyncStorage from '@react-native-async-storage/async-storage';
export class Storage {
  static key = 'USERS';
  static setUser(data) {
    return AsyncStorage.setItem('USERS', JSON.stringify(data));
  }
  static async getUser() {
    const parse = JSON.parse(await AsyncStorage.getItem('USERS'));
    return parse;
  }
  static clearUser() {
    return AsyncStorage.removeItem('USERS');
  }
  static key = 'token';
  static setToken(data) {
    return AsyncStorage.setItem('token', JSON.stringify(data));
  }
  static async getToken() {
    const parse = JSON.parse(await AsyncStorage.getItem('token'));
    return parse;
  }
  static clearToken() {
    return AsyncStorage.removeItem('token');
  }
}
