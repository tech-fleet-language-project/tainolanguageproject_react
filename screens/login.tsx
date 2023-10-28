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
  import AuthNative from '../app/native-auth'


/**
 * login in to the application 
 * @param {string} email - email of user
 * @param {string} password - password of user
 * @returns {JSX.Element}
 * @constructor
 */

// uninstall some of the dependencies in package.json
// *** Dummy UI for login to test auth and possible template for login *** //

export default function login() {
       
      
      // redundant but I want to remind me of other way to implement type safety
      const [email, setEmail] = useState<string>('');
      const [password, setPassword] = useState<string>('');
      const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
      const [eyeIcon, setEyeIcon] = useState<string>('open');
      const [loginError, setLoginError] = useState<string>('');

      const handlePasswordVisibility = () => {
        if(!passwordVisibility && eyeIcon !== 'open')
         {
          setPasswordVisibility(!passwordVisibility);
          setEyeIcon('close');
        }
        else if(passwordVisibility && eyeIcon === 'open') 
        {
          setPasswordVisibility(passwordVisibility);
          setEyeIcon('open');
        }
      };

      const auth = new AuthNative({});

      const onLogin = async() => {
        try {
          if(email === '' && password === '') {
              await auth.handleAuthorize();
          }
          else {
            // redirect to home screen
          }
        }
        catch(error) {
          console.error("User Failed to Login", error);
        }  
      };

      return (
          <SafeAreaView style={styles.container}>
            <View>
              <Image source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}} />
            </View>
              <View style={styles.inputView}>
                <TextInput style={styles.inputText}
                          value={email} 
                          placeholder='Email' 
                          placeholderTextColor='AFAFAF' 
                          onChangeText={email => setEmail(email)} />
              </View>
              <View style={styles.inputView}>
                <TextInput style={styles.inputText} 
                          value={password} 
                          placeholder='Password' 
                          placeholderTextColor='AFAFAF' 
                          onChangeText={password => setPassword(password)} />
              </View>
            <View>
            <TouchableOpacity>
              <Button title='Login' 
                    color="#f194ff" 
                    accessibilityLabel='login button' 
                    onPress={onLogin} />
              </TouchableOpacity>
            <TouchableOpacity>
              <Text>Forget Password?</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
      )
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


// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });