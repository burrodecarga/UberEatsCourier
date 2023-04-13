import { Text, View, Image, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import styles from '../../styles/styles'

export default function OrderItem({ order }) {
  const navigation = useNavigation()
  return (
    <Pressable
      style={styles.container}
      onPress={() =>{
      navigation.navigate('OrderDeliveryScreen',{id:order.id})
      }}
    >
      <Image source={{ uri: order.Restaurant.image }} style={styles.image} />
      <View style={styles.view}>
        <Text style={styles.name}>{order.Restaurant.name}</Text>
        <Text style={styles.address}>{order.Restaurant.address}</Text>
        <Text style={styles.detail}>Delivery Detail</Text>
        <Text style={{ color: 'grey' }}>{order.User.name}</Text>
        <Text style={{ color: 'grey' }}>{order.User.address}</Text>
      </View>
      <View style={styles.cintentIcon}>
        <Entypo
          name='check'
          size={30}
          color='white'
          style={{ marginLeft: 'auto' }}
        />
      </View>
    </Pressable>
  )
}
