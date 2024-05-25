import {useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductScreen = () => {
  const [search, setSearch] = useState('');
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          borderWidth: 1,
          borderRadius: 25,
          height: 50,
          width: '90%',
          marginTop: 40,
          alignSelf: 'center',
        }}>
        <AntDesign
          name="search1"
          size={25}
          style={{marginLeft: 10, marginTop: 10}}
        />
        <TextInput
          style={{fontSize: 15}}
          placeholder="search item here..."
          value={search}
          onChangeText={txt => {
            setSearch(txt);
          }}
        />
      </View>
    </View>
  );
};
export default ProductScreen;
//hello hello tj hn aa ab kya hua kuch nahi tj kon sa question tha run wala
//unhone tb toh link bhja tha ab nhi h ok koi na apne screen shot bhaje hain usse krte hain