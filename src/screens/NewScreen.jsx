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
        ...data,
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

  // total data=30
  //page1=10,page2=10,page3=10 ,total 30 data
  //api call kari toh hamare pass 10 data aya phele page main phir nich jate hi pag2 call hojaye fir niche jate hi page 3 call ho jayega

  const handleLoadMore = () => {
    if (!data?.hasNextPage) return;
    setPage(p => p + 1); // Increment page number // Fetch data for the next page
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
