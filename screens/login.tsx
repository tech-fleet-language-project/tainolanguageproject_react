import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import authNative from '../controllers/native-auth';
import firebaseAuth from '../controllers/firebase-auth';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,  getAuth} from 'firebase/auth';
import {auth as firebaseInitialize} from '../controllers/firebase.init';
// import auth from '@react-native-firebase/auth';


/**
 * log-in in to the application
 * @param {string} email - email of user
 * @param {string} password - password of user
 * @returns {JSX.Element}
 * @constructor
 */

// uninstall some of the dependencies in package.json
// *** Dummy UI for login to test auth and possible template for login *** //

export default function login() {
  // redundant but I want to remind me of other way to implement type safety

  const firebase = new firebaseAuth({});

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
  const [eyeIcon, setEyeIcon] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>('');

  const handlePasswordVisibility = () => {
    if (!passwordVisibility && !eyeIcon) {
      setPasswordVisibility(!passwordVisibility);
      setEyeIcon(false);
    } else if (passwordVisibility && eyeIcon) {
      setPasswordVisibility(passwordVisibility);
      setEyeIcon(true);
    }
  };

  
  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await firebase.handleLoginFirebase(email, password).then(user => {
          console.log(user);
        });
        // await signInWithEmailAndPassword(auth, email, password).then(
        //   userCredential => {
        //     const {user} = userCredential;
        //     console.log(userCredential);
        //     // pass data to database: implement function in other file SOC
        //   },
        // );
        // alternative method with react-native-firebase/auth library
        console.log('handleLoginFirebase produced no errors.');
      } else {
        if (email === '' && password === '') {
          // replace with modal: feedback to user?
          Alert.alert('Please enter an email and password.');
        } else if (email === '') {
          Alert.alert('Please enter an email.');
        } else {
          Alert.alert('Please enter a password.');
        }
      }
    } catch (error) {
      console.log('User Failed to Login', error);
    }
  };

  // will need something, redux?, to manage persistent state globally, async storage, and assign user profile data to global, or local?, variables
  // request user profile data on demand may not be a good idea, but is an option

  // created to handle error within the login file increase fault tolerance
  // log error and create handler: feedback to user + alert or custom modal with specific details to prompt user to resolve i.e. invalid email or password length
  // TODO: review error codes and consider other issues to address
  const handleLoginError = error => {
    if (error.code in error) {
      setLoginError(loginError[error.code]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={require('../assets/images/taino_art.jpg')}
          resizeMethod="scale"
          height={200}
          width={200}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={email}
          placeholder="Email"
          placeholderTextColor="#AFAFAF"
          onChangeText={email => {
            return setEmail(email);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={password}
          placeholder="Password"
          placeholderTextColor="#AFAFAF"
          onChangeText={password => {
            return setPassword(password);
          }}
        />
      </View>
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TouchableOpacity>
            <Button
              title="Login"
              color="#f194ff"
              accessibilityLabel="login button"
              onPress={onLogin}
            />
          </TouchableOpacity>
        </TouchableWithoutFeedback>
        <TouchableOpacity>
          <Text>Forget Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rbga(0,0,32,0.5)',
    display: 'flex',
    alignContent: 'center',
  },
  imageView: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 100,
  },
  image: {
    height: 200,
    width: 200,
  },
  inputText: {},
  inputView: {
    backgroundColor: 'red',
    margin: 8,
  },
});

// const Login = async () => {
//     <KeyBoardAvodiingView style={styles.container}>
//     <TextInput style={styles.input} />
//     <TextInput style={styles.input} />
//   </KeyBoardAvodiingView>
// }

// export default Login;

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
