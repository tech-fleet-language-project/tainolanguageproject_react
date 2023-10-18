import React, { useState } from 'react'
import { 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  TextInput, 
  Text,
  View, 
  TouchableOpacity,
  Button} from 'react-native'




export default class login extends React.Component {
    render(): React.ReatNode {
      type props = {
        email: string,
        password?: string,
      };

      // redundant but I want to remind me of other way to implement type safety
      const [email, setEmail] = useState<string>('');
      const [password, setPassword] = useState('');

      return (
          <SafeAreaView style={styles.container}>
            <View><Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}} /></View>
            <View style={styles.inputView}><TextInput style={styles.inputText} value={email} placeholder='Email' placeholderTextColor='AFAFAF' onChangeText={email => setEmail(email)} /></View>
            <View style={styles.inputView}><TextInput style={styles.inputText} value={password} placeholder='Password' placeholderTextColor='AFAFAF' onChangeText={password => setPassword(password)} /></View>
            <View>
            <TouchableOpacity><Button type='button' title={}>Login</Button></TouchableOpacity>
            <TouchableOpacity><Text>Forget Password?</Text></TouchableOpacity>
            </View>
          </SafeAreaView>
      )
    }
  }
  


  const styles = StyleSheet.create({
    container: {
       backgroundColor: 'rbga(0,0,32,0.5)',
     },
     inputView: {
       backgroundColor: 'red',
       margin: 8,
     },
     inputText: {},
   })



// const Login = async () => {
//     <SafeAreaView style={styles.container}>
//     <TextInput style={styles.input} />
//     <TextInput style={styles.input} />
//   </SafeAreaView>
// }

// export default Login;






// **** Online Emulator
// import React, { useState } from 'react'
// import { StyleSheet, Image, SafeAreaView, TextInput, Text } from 'react-native'



// export default class Login extends React.Component {
//   render() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     return (
//         <SafeAreaView style={styles.container}>
//           <Image style={styles.image} source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}}  />
//           <TextInput style={styles.input} />
//           <TextInput style={styles.input} />
//         </SafeAreaView>
//     )
//   }
// }

// const Login = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//          <TextInput style={styles.input} />
//          <TextInput style={styles.input} />
//     </SafeAreaView>
//   )
// };

// export default Login;


// const styles = StyleSheet.create({
//  container: {
//     backgroundColor: 'rbga(0,0,32,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//       uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
//       width: 300,
//       height: 300,
//   },
//   input: {
//     backgroundColor: 'red',
//     margin: 8,
//     width: 200,
//     height: 100,
//   },
// })

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});