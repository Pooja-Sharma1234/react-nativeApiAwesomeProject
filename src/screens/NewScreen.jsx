import {useEffect, useMemo, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityComponent,
  View,
} from 'react-native';


//********************pagination ********************************** */
const NewScreen = () => {
  const [data, setData] = useState({
    product: [],
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchdata(page);
  }, [page]);
  //kha se kuki jse page chng ho rha h to vse data bhi to chng ho rha h na jb state chng hogi
  // vse function
 //ok
  const fetchdata = async p => {
    try {
      const response = await fetch(
        `http://192.168.0.105:8000/api/product/data?page=${p}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('data not fetched');
      }
      const data = await response.json();
      console.log(data, 'data');
      setData(prevData => ({
        ...prevData,
        ...data,//yeah add kiya bas teacher ji isse kya hua  prev data to thik h but data jo agyatime 
        //hogya tha? kitna complicated h y or interview m to timeconsuming ho jata hoga na ok
        //ese bhi puch lete h ki code kse lik hmm.....but bhot kuch h na koi kuch bhi puch skta h 
        //
        product: [...prevData.product, ...data?.product],
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const renderItem = ({item, index}) => (
    <View key={item?._id} style={{padding: 20, flexDirection: 'row'}}>
      <Text>{index + 1}</Text>
      <Text>{item.title}</Text>
    </View>
  );
  //bd m kr dungi 
 
  // total data=30  jse css m hum class or id dete the acha
  //page1=10,page2=10,page3=10 ,total 30 data
  //api call kari toh hamare pass 10 data aya phele page main phir nich jate hi pag2 call hojaye fir niche jate hi page 3 call ho jayega na tj
  //aysa hona tha
  //ho gaya tj 
  //correction btao

  //are tj yeah kes hua hian ap toh page bhaj hi nahi rahin hain
  //sahi a raha hain na ab
  //kaam nahi kr rahain kya tj y to normally bhi ese hi show krta h pagination ka kya role hua
  //hasNextacess kr pa rahe hain phir smj ni aaya y kse kam kr rha h pura flow btao na
  //phele bataiye kya khayin aj ap mne dal badhiya call karun ?khana ku pucha mujhe smj ni aaya isliye ki kya kha liya ki smj ni aa rha ese
  //ok samjha raha hun tj call karun tjo kya o k mujhe lagana hain kya ok hlo ha
  const handleLoadMore = () => {
    if (!data?.hasNextPage) return;
    setPage(p => p + 1); // Increment page number // Fetch data for the next page ha 
  };

  const renderFooter = () => {
    if (!data?.hasNextPage) return null;
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (
    <>
      <Text>--{JSON.stringify(data?.productLength)}</Text>
      <Text>--{JSON.stringify(data?.product?.length)}</Text>
      <FlatList
        data={data?.product}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </>
  );
};
//sahi hua kya tj
//itna hi data h ok tj

//********************************************************************** */
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return {...state, count: state.count + 1};
//     case 'DECREMENT':
//       return {...state, count: state.count - 1};
//     default:
//       return state;
//   }
// };

// Initial state
// const initialState = {
//   count: 0,
// };
/*****************************USE MEMO************************************ */
// const NewScreen = () => {
//   return (
//     <View>
//       <Callbck />
//     </View>
//   );
// };
// const Callbck = () => {
//   const [count, setCount] = useState(0);
//   const fun = useMemo(() => {
//     console.log('print result');
//     // console.log('print result');
//     // return count * 2;
//   }, [count]);

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={() => {
//           setCount(count + 1);
//         }}>
//         <Text>Count:{count}</Text>
//         <Text>{fun}</Text>

//         <Text>dec</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           setCount(count - 1);
//         }}></TouchableOpacity>
//     </View>
//   );
// };
/****************************************************************************** */

// const Counter = () => {
//   // useReducer hook
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <View>
//       <Text>Count: {state.count}</Text>
//       <TouchableOpacity onPress={() => dispatch({type: 'INCREMENT'})}>
//         <Text>Increment</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => dispatch({type: 'DECREMENT'})}>
//         <Text>Decrement</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
//   const [user, setUser] = useState([]);
//   useEffect(() => {
//     fetchdata();
//   }, []);
//   const fetchdata = async () => {
//     try {
//       const response = await fetch('https://fakestoreapi.com/products');

//       if (!response.ok) {
//         throw new Error('data not fetched');
//       }
//       const data = await response.json();
//       setUser(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const renderItem = ({item}) => {
//     return (
//       <View>
//         <Image source={{uri: item.image}} style={{height: 50, width: 50}} />

//         <Text style={{borderRadius: 10, borderWidth: 1}}>
//           {JSON.stringify(item)}
//         </Text>
//       </View>
//     );
//   };
//   const slice = user.slice(0, 3);
//   return (
//     <FlatList data={user ? [user] : []} renderItem={renderItem}></FlatList>
//   );

//    <FlatList data={slice} renderItem={renderItem}></FlatList>;

export default NewScreen;
//import React, { useReducer } from 'react';

// Reducer function
