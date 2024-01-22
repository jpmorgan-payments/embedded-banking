import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Config,
  OAuth2Tokens,
  TokenManager,
  TokenStorage,
  FRUser,
  UserManager,
} from '@forgerock/javascript-sdk';

import { FORGEROCK_CONFIG } from 'data/constants';

Config.set({
  clientId: FORGEROCK_CONFIG.WEB_OAUTH_CLIENT,
  redirectUri: `${FORGEROCK_CONFIG.APP_URL}/login/callback`,
  scope: 'openid profile email',
  serverConfig: {
    baseUrl: FORGEROCK_CONFIG.AM_URL,
    timeout: 5000,
  },
  realmPath: FORGEROCK_CONFIG.REALM_PATH,
  tree: 'Inbound Federation',
});

interface IForgeRockUserContext {
  redirectToLogin: () => Promise<void | OAuth2Tokens>;
  authorize: (code: string, state: string) => Promise<void | OAuth2Tokens>;
  logout: () => Promise<void>;
  user: any;
  tokens: OAuth2Tokens | undefined;
  checkedForTokens: boolean;
  isRedirecting: boolean;
}

const ForgeRockUserContext = createContext<IForgeRockUserContext | undefined>(
  undefined,
);

export const useForgeRockUser = () => {
  const context = useContext(ForgeRockUserContext);
  if (context === undefined) {
    throw new Error('useForgeRockUser must be used in a ForgeRockUserProvider');
  }
  return context;
};

export const ForgeRockUserProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const location = useLocation();
  const [tokens, setTokens] = useState<OAuth2Tokens | undefined>(undefined);
  const [user, setUser] = useState<any>(undefined);
  const [checkedForTokens, setCheckedForTokens] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Check for existing tokens
  useEffect(() => {
    async function checkForTokens() {
      try {
        const tokens = await TokenStorage.get();
        if (tokens) {
          setTokens(tokens);
          const user = await UserManager.getCurrentUser();
          if (user) {
            setUser(user);
          }
        }
      } catch (e) {
        console.error(`Error: check for tokens; ${e}`);
      }
      setCheckedForTokens(true);
    }

    if (!checkedForTokens) {
      checkForTokens();
    }
  }, [checkedForTokens, location.pathname]);

  /**
   * Redirects the user to ForgeRock's Central UI to handle authentication.
   * If tokens already exist, sets the current user.
   */
  async function redirectToLogin() {
    setIsRedirecting(true);
    const tokens = await TokenManager.getTokens({
      forceRenew: false,
      login: 'redirect',
    });
    const user = await UserManager.getCurrentUser();
    setTokens(tokens || undefined);
    setUser(user);
  }

  /**
   * Exchanges the authorization code for tokens
   *
   * @param code The one-time authorization code
   * @param state The state echoed back by the OAuth server
   */
  async function authorize(code: string, state: string) {
    let tokens, user;
    try {
      tokens = await TokenManager.getTokens({
        query: { code: code, state: state },
      });
      user = await UserManager.getCurrentUser();
    } catch (e) {
      console.error(`Error: authorize; ${e}`);
    }
    setTokens(tokens || undefined);
    setUser(user);
  }

  async function logout() {
    try {
      await TokenManager.deleteTokens();
      await FRUser.logout();
      setCheckedForTokens(false);
      setUser(undefined);
      setTokens(undefined);
    } catch (err) {
      console.error(`Error: logout; ${err}`);
    }
  }

  return (
    <ForgeRockUserContext.Provider
      value={{
        authorize,
        redirectToLogin,
        logout,
        user,
        tokens,
        checkedForTokens,
        isRedirecting,
      }}
    >
      {children}
    </ForgeRockUserContext.Provider>
  );
};
