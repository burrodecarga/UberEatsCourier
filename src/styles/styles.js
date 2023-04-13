import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flexDirection:'row', borderColor:'#3FC060', borderWidth:2, borderRadius:12, margin:10, padingVertical:5 },
  image:{ width: '25%', height: '100%', borderRadius:10 },
  view:{flex:1, marginLeft:10 },
  name:{ fontSize:14, fontWeight: 'bold'},
  address:{ fontSize:14, color:'grey'},
  detail:{ marginTop:5, fontSize:14, fontWeight: 'bold' },
  cintentIcon:{  backgroundColor: '#038b0e', borderBottomRightRadius:10,  borderTopRightRadius:10, alignItems: 'center', justifyContent: 'center', padding:4},
  

})