import {UserInfo} from 'firebase/auth';
import {auth} from './firebase.init';

// generate user profile data for settings, workers, and other purposes

type userinfo = {
  displayname: string;
  email: string;
  photoUrl: string;
  phoneNumber: string;
  emailVerified: string;
};

const userProfile = auth.currentUser;

export default function handleUserProfile() {
  try {
    if (userProfile !== null) {
      // the user object has basic properties such as display name, email, etc.
      const displayName = userProfile.displayName;
      const email = userProfile.email;
      const photoURL = userProfile.photoURL;
      const emailVerified = userProfile.emailVerified;

      // the user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = userProfile.uid;
      console.log('User profile is provided');
    }
  } catch (error) {
    console.error(error);
  }
}
