import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  //const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo || location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        //audience: audience,
        redirect_uri: "https://auth0-silk.vercel.app/",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
