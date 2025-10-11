export const getKeys = <T extends Object>(data: T): (keyof T)[] => {
  return Object.keys(data) as (keyof T)[];
};
export interface googleAuthParams {
  redirect_uri: string;
  client_id: string;
  prompt: string;
  scope: string;
}

export const getGooleAuthUrl = () => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: import.meta.env.VITE_PUBLIC_OAUTH_ENDPOINT,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
  };
  console.log({ options });
  const qs = new URLSearchParams(options);
  return `${baseUrl}?${qs.toString()}`;
};
