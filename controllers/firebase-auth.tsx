import React, {useCallback} from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  ProviderId,
  AuthErrorCodes,
} from 'firebase/auth';
import {auth} from '@/controllers/firebase.config';
import {FirebaseError} from 'firebase-admin';

// TODO: code may need to be denormalized

export default class AuthFirebase extends React.Component {
  // sign up new user
  handleSignupFirebase = useCallback(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // signed up
          const {user} = userCredential;
        })
        .catch(error => {
          if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
            console.error('Email is already in use!');
            // error message and feedback to user
          } else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
            console.error('Invalid Email');
          } else {
            console.error('Error');
          }
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    [],
  );

  // login  user
  handleLoginFirebase = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // log in
        const {user} = userCredential;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, []);

  // confirm login of user
  handleConfirmLogin = useCallback(async () => {
    await onAuthStateChanged(auth, user => {
      if (user) {
        // user is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid} = user;
      } else {
        // user is signed out
        // pass data to DB log
      }
    });
  }, []);

  // needs to be configed: Google, Faceback, GitHUb, etc. in Firebase

  // DRY?!
  handlePopupProvider = useCallback(
    async (provider: string) => {
      if (ProviderId.GOOGLE === provider) {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
          .then(result => {
            // the signed-in user info.
            const {user} = result;

            // this gives you a Google Access Token you can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);

            // @ts-ignore
            const {accessToken} = credential;

            // IdP data available using getAdditionalUserInfo(result)
          })
          .catch(error => {
            this.handleCredentialError(error);
            // the email of the user's account used.
            const {email} = error.customData;
            // the AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
      } else if (ProviderId.FACEBOOK === provider) {
        const provider = new FacebookAuthProvider();
        await signInWithPopup(auth, provider)
          .then(result => {
            // the signed-in user info.
            const {user} = result;

            // this gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential =
              FacebookAuthProvider.credentialFromResult(result);

            // @ts-ignore
            const {accessToken} = credential;

            // IdP data available using getAdditionalUserInfo(result)
          })
          .catch(error => {
            this.handleCredentialError(error);
            // the email of the user's account used.
            const {email} = error.customData;
            // the AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
          });
      } else if (ProviderId.TWITTER === provider) {
        const provider = new TwitterAuthProvider();
        signInWithPopup(auth, provider)
          .then(result => {
            // the signed-in user info.
            const {user} = result;

            // this gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = TwitterAuthProvider.credentialFromResult(result);

            // @ts-ignore
            const {accessToken} = credential;

            // IdP data available using getAdditionalUserInfo(result)
          })
          .catch(error => {
            this.handleCredentialError(error);
            // the email of the user's account used.
            const {email} = error.customData;
            // the AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);
          });
      } else if (ProviderId.GITHUB === provider) {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
          .then(result => {
            // the signed-in user info.
            const {user} = result;

            // this gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = GithubAuthProvider.credentialFromResult(result);

            // @ts-ignore
            const {accessToken} = credential;

            // IdP data available using getAdditionalUserInfo(result)
          })
          .catch(error => {
            this.handleCredentialError(error);
            // the email of the user's account used.
            const {email} = error.customData;
            // the AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
          });
      } else if (provider === 'microsoft.com') {
        const provider = new OAuthProvider('microsoft.com');
        signInWithPopup(auth, provider)
          .then(result => {
            // user is signed in.
            // IdP data available in result.additionalUserInfo.profile.

            // get the OAuth access token and ID Token
            const credential = OAuthProvider.credentialFromResult(result);

            // @ts-ignore
            const {accessToken} = credential;

            // @ts-ignore
            const {idToken} = credential;
          })
          .catch(error => {
            this.handleCredentialError(error);
          });
      } else if (provider === 'yahoo.com') {
        const provider = new OAuthProvider('yahoo.com');
        signInWithPopup(auth, provider)
          .then(result => {
            // user is signed in.
            // IdP data available in result.additionalUserInfo.profile.

            // get the OAuth access token and ID Token
            const credential = OAuthProvider.credentialFromResult(result);

            // @ts-ignore
            const {accessToken} = credential;

            // @ts-ignore
            const {idToken} = credential;
          })
          .catch(error => {
            this.handleCredentialError(error);
          });
      }
    },
    [ProviderId],
  );

  // TODO: confirm correct interface and admen import
  handleCredentialError = (error: FirebaseError) => {
    if (error.code === AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE) {
      console.error('Credentials is already in use!');
      // error message and feedback to user
    } else if (error.code === AuthErrorCodes.CREDENTIAL_MISMATCH) {
      console.error('Invalid Credentials');
    } else if (error.code === AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN) {
      console.error('Credentials are outdated');
    } else {
      console.error('Error');
    }
    // handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  };
} //end of class
