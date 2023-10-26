//@ts-nocheck
import React, { useCallback, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { authorize,
         refresh,
         revoke,
         AuthConfiguration,
         prefetchConfiguration } from 'react-native-app-auth';



const config: AuthConfiguration = {
  issuer: '',
  clientId: '',
  redirectUrl: '',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  additionalParameters: {},
  connectionTimeoutSeconds: 5,
  iosPrefersEphemeralSession: false,
  serviceConfiguration: {
    authorizationEndpoint: '',
    tokenEndpoint: '',
    revocationEndpoint: '',
    registrationEndpoint: '',
    endSessionEndpoint:'',
  }        
};


type defaultauthstate = {
    hasLoggedInOnce: boolean,
    provider: string
    accessToken: string,
    accessTokenExpirationDate?: string,
    refreshToken: string,
    connectionTimeoutSeconds: number,
    iosPrefersEphemeralSession?: boolean,
   
  };

  const defaultAuthState: defaultauthstate = {
    hasLoggedInOnce: false,
    provider: '',
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
    iosPrefersEphemeralSession: false,
    connectionTimeoutSeconds: 5,

  
  };

  export const Auth1 = () => {
    const [authState, setAuthState] = useState(defaultAuthState);

    const handleAuthorize = useCallback(async () => {
      try {
        const newAuthState = await authorize(config);

        setAuthState({
          hasLoggedInOnce: true,
          iosPrefersEphemeralSession: false,
          connectionTimeoutSeconds: 5,
          ...newAuthState,
        });
        // okta?!
        await Keychain.setGenericPassword(
          'accessToken',
          newAuthState.accessToken,
        );
      } catch (error) {
        Alert.alert(
          'Failed to log in',
          (error as Record<string, never>)?.message,
        );
      }
    }, []);

    const getAccessToken = useCallback(async (): Promise<string | undefined> => {
      try {
        
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          return credentials.password;
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }, []);

    const [userInfo, setUserInfo] = useState<Record<string, string> | null>(null);

    const getUser = useCallback(async () => {
      try {
        const access_token = await getAccessToken();
        if (access_token !== null) {
          fetch('<URL>' + '/oauth2/userinfo', {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
          })
            .then(response => response.json())
            .then(json => {
              console.log(json);
              setUserInfo(json);
            })
            .catch(error => {
              console.error(error);
            });
        }
      } catch (error) {
        console.error('User does not exist', error);
      }
    }, []);

  };

  
  const configs = {
    identityserver: {
      issuer: 'https://demo.duendesoftware.com',
      clientId: 'interactive.public',
      redirectUrl: 'io.identityserver.demo:/oauthredirect',
      additionalParameters: {},
      scopes: ['openid', 'profile', 'email', 'offline_access'],
  
      // serviceConfiguration: {
      //   authorizationEndpoint: '',
      //   tokenEndpoint: '',
      //   revocationEndpoint: '',
      //   registrationEndpoint: '',
      //   endSessionEndpoint:'',

    },
    auth0: {
      // From https://openidconnect.net/
      issuer: 'https://samples.auth0.com',
      clientId: 'kbyuFDidLLm280LIwVFiazOqjO3ty8KH',
      redirectUrl: 'https://openidconnect.net/callback',
      additionalParameters: {},
      scopes: ['openid', 'profile', 'email', 'phone', 'address'],
  
      // serviceConfiguration: {
      //   authorizationEndpoint: '',
      //   tokenEndpoint: '',
      //   revocationEndpoint: '',
      //   registrationEndpoint: '',
      //   endSessionEndpoint:'',
    },
  };
  

  
  export const Auth2 = () => {
    const [authState, setAuthState] = useState(defaultAuthState);
    React.useEffect(() => {
      prefetchConfiguration({
        warmAndPrefetchChrome: true,
        connectionTimeoutSeconds: 5,
        ...configs.auth0,
      });
    }, []);
  
    const handleAuthorize = useCallback(async provider => {
      try {
        const config = configs[provider];
        const newAuthState = await authorize({
          ...config,
          connectionTimeoutSeconds: 5,
          iosPrefersEphemeralSession: true,
        });
  
        setAuthState({
          hasLoggedInOnce: true,
          provider: provider,
          ...newAuthState,
        });
      } catch (error) {
        // Alert.alert('Failed to log in', error.message);
        console.error('Failed to log in', error);
      }
    }, []);
  
    const handleRefresh = useCallback(async () => {
      try {
        const config = configs[authState.provider];
        const newAuthState = await refresh(config, {
          refreshToken: authState.refreshToken,
        });
  
        setAuthState(current => ({
          ...current,
          ...newAuthState,
          refreshToken: newAuthState.refreshToken || current.refreshToken,
        }));
      } catch (error) {
        // Alert.alert('Failed to refresh token', error.message);
        console.error('Failed to refresh token', error)
      }
    }, [authState]);
  
    const handleRevoke = useCallback(async () => {
      try {
        const config = configs[authState.provider];
        await revoke(config, {
          tokenToRevoke: authState.accessToken,
          sendClientId: true,
        });
  
        setAuthState({
          provider: '',
          accessToken: '',
          accessTokenExpirationDate: '',
          refreshToken: '',
        });
      } catch (error) {
        // Alert.alert('Failed to revoke token', error.message);
        console.error('Failed to revoke token', error)
      }
    }, [authState]);
  
    const showRevoke = useMemo(() => {
      if (authState.accessToken) {
        const config = configs[authState.provider];
        if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
          return true;
        }
      }
      return false;
    }, [authState]);
  
    // return (
    //       {!authState.accessToken ? (
    //         <>
    //           <Button
    //             onPress={() => handleAuthorize('identityserver')}
    //             text="Authorize IdentityServer"
    //             color="#DA2536"
    //           />
    //           <Button
    //             onPress={() => handleAuthorize('auth0')}
    //             text="Authorize Auth0"
    //             color="#DA2536"
    //           />
    //         </>
    //       ) : null}
    //       {authState.refreshToken ? (
    //         <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
    //       ) : null}
    //       {showRevoke ? (
    //         <Button onPress={handleRevoke} text="Revoke" color="#EF525B" />
    //       ) : null}
       
    // );
  };