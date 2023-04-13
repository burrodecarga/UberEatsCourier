import { useRef, useMemo, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View, Pressable } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { FontAwesome5, Fontisto, MaterialIcons } from '@expo/vector-icons'
import orders from '../../../assets/data/orders.json'
import { ScrollView } from 'react-native-gesture-handler'
import MapView, {Marker} from 'react-native-maps'
import { Entypo } from '@expo/vector-icons'
import styles from '../OrdersDeliveryScreen/styles'
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

const order = orders[0]
//Location.setApiKey("AIzaSyDLKcEVNHsNoxYKRIL1Kmyjii5LViPEWtE");

const OrderDelivery = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const bottonSheetRef = useRef(null)
  const snapPoints = useMemo(() => ['12%', '95%'], [])
  const {width, height} = useWindowDimensions()

  useEffect(()=>{
    (async ()=>{
      let {status} = await Location.requestForegroundPermissionsAsync()
      
      if (!status === "granted"){
        console.warn('Negado')
        console.log("Location permission denied");
        return;
      }

      let location  = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000,
        timeout: 5000
      })
      .then(location =>{
        console.log(location);
        setDriverLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })

      })
      .catch(e => console.log(e)
      
    )})()
    
  },[])

  if(!driverLocation){return <ActivityIndicator size={30} color="red"/>}
  return (
    <View
      style={styles.container}
    >
      <MapView
      zoomControlEnabled="true"
      style={{ 
        height,
        width
      }}
      showsUserLocation
      followsUserLocation
      zoomEnabled={true}
      scrollEnabled={true}
      showsScale={true}
       initialRegion={{
         latitude:driverLocation.latitude,
         longitude:driverLocation.longitude,
         latitudeDelta: 1.07,
         longitudeDelta: 1.07,
       }
      }
      >
        <Marker
          coordinate={{
            latitude: order.Restaurant.lat,
            longitude: order.Restaurant.lng,
          }}
          title={order.Restaurant.name}
          description={order.Restaurant.address}
        >
           <View
            style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}
          >
            <Entypo name="shop" size={30} color="white" />
          </View>
        </Marker>

        <Marker
          coordinate={{
            latitude: order.User.lat,
            longitude: order.User.lng,
          }}
          title={order.User.name}
          description={order.User.address}
        >
           <View
            style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}
          >
            <MaterialIcons name="restaurant" size={30} color="white" />
          </View>
        </Marker>

        </MapView>
        <BottomSheet
          ref={bottonSheetRef}
          snapPoints={snapPoints}
          handleIndicatorStyle={styles.handleIndicator}
        >
          {/* <MapViewDirections
          origin={driverLocation}
          destination={{
            latitude:order.User.lat,
            longitude:order.User.lng,
          }          
          }
          strokeWidth={10}
          strokeColor="#3FC060"
          apikey={"AIzaSyA40_jSaAHHq6J3o3HKJujVrMHv9gcSV3E"}
          onReady={(result) => {
            setIsDriverClose(result.distance <= 0.1);
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        /> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 16 }}>14 min</Text>
            <FontAwesome5
              name='shopping-bag'
              size={20}
              color='#3Fc060'
              style={styles.navigationIcon}
            />
            <Text style={{ fontSize: 16 }}>5 km.</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <Fontisto name='shopping-store' size={23} color='red' />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  paddingVertical: 10,
                  marginLeft: 25,
                }}
              >
                {order.Restaurant.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5 name='map-marker-alt' size={23} color='grey' />
              <Text style={{ fontSize: 14, color: 'grey', marginLeft: 25 }}>
                {order.Restaurant.address}
              </Text>
            </View>
            <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>
              Delivery Detail
            </Text>
            <Text style={{ color: 'grey' }}>{order.User.name}</Text>
            <Text style={{ color: 'grey' }}>{order.User.address}</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
              }}
            />
            <ScrollView style={{ marginVertical: 10 }}>
              <Text style={{ color: 'grey' }}>Plato 1 x2</Text>
              <Text style={{ color: 'grey' }}>Plato 2 x1</Text>
              <Text style={{ color: 'grey' }}>Plato 3 x4</Text>
                          
            </ScrollView>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: 'green',
              marginTop: 'auto',
              marginVertical: 40,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Acept Order
            </Text>
          </View>
        </BottomSheet>
      </View>
  
  )
}

export default OrderDelivery


