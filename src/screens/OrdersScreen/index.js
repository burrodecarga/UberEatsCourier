import { useRef, useMemo } from 'react'
import { Text, View, useWindowDimensions, FlatList } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import orders from '../../../assets/data/orders.json'
import OrderItem from '../../components/OrderItem'
import {useNavigation} from '@react-navigation/native'
import MapView, {Marker} from 'react-native-maps'
import { Entypo } from '@expo/vector-icons'


const OrdersScreen = () => {
  const {width, height} = useWindowDimensions()
  const navigation = useNavigation()
  const bottonSheetRef = useRef(null)
  const snapPoints = useMemo(()=>['100%','95%'],[])
  return (
    <View style={{ flex: 1, backgroundColor: 'lightblue' }}>
      <MapView
      style={{ 
        height,
        width
      }}
      showsUserLocation
      followsUserLocation
      >
      {orders.map((order, index) =>(
      <Marker
            key={order.id}
            title={order.Restaurant.name}
            description={order.Restaurant.address}
            coordinate={{
              latitude: order.Restaurant.lat,
              longitude: order.Restaurant.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
      <Entypo name="shop" size={12} color='blue'/>
      <View style={{backgroundColor: 'white', padding:5, borderRadius:50}}>
       <Entypo name="shop" size={12} color='blue'/>
        </View>
      </Marker>
))}
   </MapView>
     
      <BottomSheet ref={bottonSheetRef} snapPoints={snapPoints}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '600',
              letterSpacing: 0.5,
              color: 'grey',
            }}
          >
            You're OnLine
          </Text>
          <Text>Available Orders: {orders.length}</Text>
        </View>
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      </BottomSheet>
    </View>
  )
}

export default OrdersScreen
