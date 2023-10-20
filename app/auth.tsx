import { 
    AuthConfiguration,
    RegistrationConfiguration, 
    AuthorizeResult, 
    authorize, 
    refresh, 
    revoke, 
    signOut, 
    logOut } from 'react-native-app-auth';

type State = {
    hasLoggedInOnce: boolean,
    accessToken: ?string,
    accessTokenExpirationDate: ?string,
    authorizeAdditionalParameters: ?object,
    idToken: ?string,
    refreshToken: ?string,
    tokenType: ?string,
    scopes: ?string[],
    authorizationCode: ?string,
    codeVerifier: ?string,
};

// accessToken - (string) the access token
// accessTokenExpirationDate - (string) the token expiration date
// authorizeAdditionalParameters - (Object) additional url parameters from the authorizationEndpoint response.
// tokenAdditionalParameters - (Object) additional url parameters from the tokenEndpoint response.
// idToken - (string) the id token
// refreshToken - (string) the refresh token
// tokenType - (string) the token type, e.g. Bearer
// scopes - ([string]) the scopes the user has agreed to be granted
// authorizationCode - (string) the authorization code (only if skipCodeExchange=true)
// codeVerifier - (string) the codeVerifier value used for the PKCE exchange (only if both skipCodeExchange=true and usePKCE=true)

const config: Record<string, AuthConfiguration> {
    issuer: '',
    clientId: {clientId},
    redirectUrl: '',
    // urls for resigtration
    redirectUrls: ['<YOUR_REDIRECT_URL>', '<YOUR_OTHER_REDIRECT_URL>']
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    serviceConfiguration: {
      authorizationEndpoint: '',
      tokenEndpoint: '',
      revocationEndpoint: '',
      registrationEndpoint: '',
      endSessionEndpoint:'',
    }        
};

const registerConfig: Record<string, RegistrationConfiguration> = {
    issuer: '<YOUR_ISSUER_URL>',
    redirectUrls: ['<YOUR_REDIRECT_URL>', '<YOUR_OTHER_REDIRECT_URL>'],
  };

// config
// This is your configuration object for the client. The config is passed into each of the methods with optional overrides.

// issuer - (string) base URI of the authentication server. If no serviceConfiguration (below) is provided, issuer is a mandatory field, so that the configuration can be fetched from the issuer's OIDC discovery endpoint.
// serviceConfiguration - (object) you may manually configure token exchange endpoints in cases where the issuer does not support the OIDC discovery protocol, or simply to avoid an additional round trip to fetch the configuration. If no issuer (above) is provided, the service configuration is mandatory.
// authorizationEndpoint - (string) REQUIRED fully formed url to the OAuth authorization endpoint
// tokenEndpoint - (string) REQUIRED fully formed url to the OAuth token exchange endpoint
// revocationEndpoint - (string) fully formed url to the OAuth token revocation endpoint. If you want to be able to revoke a token and no issuer is specified, this field is mandatory.
// registrationEndpoint - (string) fully formed url to your OAuth/OpenID Connect registration endpoint. Only necessary for servers that require client registration.
// endSessionEndpoint - (string) fully formed url to your OpenID Connect end session endpoint. If you want to be able to end a user's session and no issuer is specified, this field is mandatory.
// clientId - (string) REQUIRED your client id on the auth server
// clientSecret - (string) client secret to pass to token exchange requests. ⚠️ Read more about client secrets
// redirectUrl - (string) REQUIRED the url that links back to your app with the auth code
// scopes - (array<string>) the scopes for your token, e.g. ['email', 'offline_access'].
// additionalParameters - (object) additional parameters that will be passed in the authorization request. Must be string values! E.g. setting additionalParameters: { hello: 'world', foo: 'bar' } would add hello=world&foo=bar to the authorization request.
// clientAuthMethod - (string) ANDROID Client Authentication Method. Can be either basic (default) for Basic Authentication or post for HTTP POST body Authentication
// dangerouslyAllowInsecureHttpRequests - (boolean) ANDROID whether to allow requests over plain HTTP or with self-signed SSL certificates. ⚠️ Can be useful for testing against local server, should not be used in production. This setting has no effect on iOS; to enable insecure HTTP requests, add a NSExceptionAllowsInsecureHTTPLoads exception to your App Transport Security settings.
// customHeaders - (object) ANDROID you can specify custom headers to pass during authorize request and/or token request.
// authorize - ({ [key: string]: value }) headers to be passed during authorization request.
// token - ({ [key: string]: value }) headers to be passed during token retrieval request.
// register - ({ [key: string]: value }) headers to be passed during registration request.
// additionalHeaders - ({ [key: string]: value }) IOS you can specify additional headers to be passed for all authorize, refresh, and register requests.
// useNonce - (boolean) (default: true) optionally allows not sending the nonce parameter, to support non-compliant providers. To specify custom nonce, provide it in additionalParameters under the nonce key.
// usePKCE - (boolean) (default: true) optionally allows not sending the code_challenge parameter and skipping PKCE code verification, to support non-compliant providers.
// skipCodeExchange - (boolean) (default: false) just return the authorization response, instead of automatically exchanging the authorization code. This is useful if this exchange needs to be done manually (not client-side)
// iosCustomBrowser - (string) (default: undefined) IOS override the used browser for authorization, used to open an external browser. If no value is provided, the SFAuthenticationSession or SFSafariViewController are used.
// iosPrefersEphemeralSession - (boolean) (default: false) IOS indicates whether the session should ask the browser for a private authentication session.
// androidAllowCustomBrowsers - (string[]) (default: undefined) ANDROID override the used browser for authorization. If no value is provided, all browsers are allowed.
// androidTrustedWebActivity - (boolean) (default: false) ANDROID Use EXTRA_LAUNCH_AS_TRUSTED_WEB_ACTIVITY when opening web view.
// connectionTimeoutSeconds - (number) configure the request timeout interval in seconds. This must be a positive number. The default values are 60 seconds on iOS and 15 seconds on Android.

// serviceConfiguration - (object) you may manually configure token exchange endpoints in cases where the issuer does not support the OIDC discovery protocol, or simply to avoid an additional round trip to fetch the configuration. If no issuer (above) is provided, the service configuration is mandatory.
    // authorizationEndpoint - (string) REQUIRED fully formed url to the OAuth authorization endpoint
    // tokenEndpoint - (string) REQUIRED fully formed url to the OAuth token exchange endpoint
    // revocationEndpoint - (string) fully formed url to the OAuth token revocation endpoint. If you want to be able to revoke a token and no issuer is specified, this field is mandatory.
    // registrationEndpoint - (string) fully formed url to your OAuth/OpenID Connect registration endpoint. Only necessary for servers that require client registration.
    // endSessionEndpoint - (string) fully formed url to your OpenID Connect end session endpoint. If you want to be able to end a user's session and no issuer is specified, this field is mandatory.

    // State is unnecessary because of AuthorizeResult - decide
export class Auth extends React.Component<{}, State> {
// pass only the parameter that the function needs: config***

    state: Record<string, AuthorizeResult> = {
        hasLoggedInOnce: false,
        accessToken: ' ',
        accessTokenExpirationDate: ' ',
        authorizeAdditionalParameters: null,
        idToken: ' ',
        refreshToken: ' ',
        tokenType: ' ',
        scopes: [],
        authorizationCode: ' ',
        codeVerifier: ' ',
    };

    const handleRegistration= async () => {
        try {
        const resultRegister= await register(config);
        console.log('User has been registred');
        } catch (error) {
        console.error(error);
        }
    };



    const handleAuthorize = async () => {
        try {
        const resultAuth = await authorize({config});
        {() => {hasLoggedInOnce: true}};
        // export result or if class push state and database to log access 
        console.log('User has been authenticated');
        } catch (error) {
        // setup database to log error 
        console.error(error);
        }
    };

    const handleRefresh= async () => {
        try {
        const resultRefresh = await refresh(config, {
            refreshToken: resultAuth.refreshToken,
        });
        console.log('User has been revoked');
        } catch (error) {
        console.error(error);
        }
    };

    const handleRovoke= async () => {
        try {
        const resultRevoke = await revoke(config, {
            tokenToRevoke: resultAuth.accessToken || resultAuth.refreshToken ,
            includeBasicAuth: true,
            sendClientId: true,
        });
        console.log('User has been revoked');
        } catch (error) {
        console.error(error);
        }
    };


    const handleSignOut = async () => {
        try {
        const resultSignOut = await signOut(config);
        console.log('User signed out');
        } catch (error) {
        console.error(error);
        }
    };

    const handleLogOut = async () => {
        try {
        const resultLogOut = await logout(config, {
            idToken: resultAuth.idToken,
            postLogoutRedirectUrl: 'send user back to home if not done automatically',
        });
        console.log('User signed out');
        } catch (error) {
        console.error(error);
        }
    };

}

  const [authState, setAuthState] = useState(defaultAuthState);

  const handleAuthorize = async () => {
    try {
      const newAuthState = await authorize(config);

      setState({
        hasLoggedInOnce: true,
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
  };

  const getAccessToken = async (): Promise<string | undefined> => {
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
  };

  const [userInfo, setUserInfo] = useState<Record<string, string> | null>(null);

  const getUser = async () => {
    try {
      const access_token = await getAccessToken();
      if (access_token !== null) {
        fetch( + '/oauth2/userinfo', {
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
      console.log(error);
    }
  };



  import React, {useState, useCallback, useMemo} from 'react';
  import {Alert} from 'react-native';
  import {
    authorize,
    refresh,
    revoke,
    prefetchConfiguration,
  } from 'react-native-app-auth';
  import {
    Page,
    Button,
    ButtonContainer,
    Form,
    FormLabel,
    FormValue,
    Heading,
  } from './components';
  
  const configs = {
    identityserver: {
      issuer: 'https://demo.duendesoftware.com',
      clientId: 'interactive.public',
      redirectUrl: 'io.identityserver.demo:/oauthredirect',
      additionalParameters: {},
      scopes: ['openid', 'profile', 'email', 'offline_access'],
  
      // serviceConfiguration: {
      //   authorizationEndpoint: 'https://demo.duendesoftware.com/connect/authorize',
      //   tokenEndpoint: 'https://demo.duendesoftware.com/connect/token',
      //   revocationEndpoint: 'https://demo.duendesoftware.com/connect/revoke'
      // }
    },
    auth0: {
      // From https://openidconnect.net/
      issuer: 'https://samples.auth0.com',
      clientId: 'kbyuFDidLLm280LIwVFiazOqjO3ty8KH',
      redirectUrl: 'https://openidconnect.net/callback',
      additionalParameters: {},
      scopes: ['openid', 'profile', 'email', 'phone', 'address'],
  
      // serviceConfiguration: {
      //   authorizationEndpoint: 'https://samples.auth0.com/authorize',
      //   tokenEndpoint: 'https://samples.auth0.com/oauth/token',
      //   revocationEndpoint: 'https://samples.auth0.com/oauth/revoke'
      // }
    },
  };
  
  const defaultAuthState = {
    hasLoggedInOnce: false,
    provider: '',
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
  };
  
  const App = () => {
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
        Alert.alert('Failed to log in', error.message);
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
        Alert.alert('Failed to refresh token', error.message);
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
        Alert.alert('Failed to revoke token', error.message);
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
  
    return (
      <Page>
        {authState.accessToken ? (
          <Form>
            <FormLabel>accessToken</FormLabel>
            <FormValue>{authState.accessToken}</FormValue>
            <FormLabel>accessTokenExpirationDate</FormLabel>
            <FormValue>{authState.accessTokenExpirationDate}</FormValue>
            <FormLabel>refreshToken</FormLabel>
            <FormValue>{authState.refreshToken}</FormValue>
            <FormLabel>scopes</FormLabel>
            <FormValue>{authState.scopes.join(', ')}</FormValue>
          </Form>
        ) : (
          <Heading>
            {authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}
          </Heading>
        )}
  
        <ButtonContainer>
          {!authState.accessToken ? (
            <>
              <Button
                onPress={() => handleAuthorize('identityserver')}
                text="Authorize IdentityServer"
                color="#DA2536"
              />
              <Button
                onPress={() => handleAuthorize('auth0')}
                text="Authorize Auth0"
                color="#DA2536"
              />
            </>
          ) : null}
          {authState.refreshToken ? (
            <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
          ) : null}
          {showRevoke ? (
            <Button onPress={handleRevoke} text="Revoke" color="#EF525B" />
          ) : null}
        </ButtonContainer>
      </Page>
    );
  };
  
  export default App;
  