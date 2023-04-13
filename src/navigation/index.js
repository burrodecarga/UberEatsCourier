import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from '../screens/OrdersScreen'
import OrderDeliveryScreen from '../screens/OrdersDeliveryScreen';

const Stack = createNativeStackNavigator();

const Navigation = ()=>{
  return (
  
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrdersScreen" component={OrdersScreen}/>
      <Stack.Screen name="OrderDeliveryScreen" component={OrderDeliveryScreen}/>
    </Stack.Navigator>
     
  )
}

export default Navigation;

