interface IEnvironmentConfig {
  [key: string]: {
    appUrl: string;
    apiUrl: string;
    WsUrl: string;
  };
}

const EnvironmentConfig: IEnvironmentConfig = {
  local: {
    appUrl: 'http://localhost:3001',
    apiUrl: '/api/v1',
    WsUrl: 'ws://localhost:4000',
  },

  development: {
    appUrl: 'https://shippee.nguyenconggioi.me',
    apiUrl: 'https://api-shippee.nguyenconggioi.me',
    WsUrl: 'wss://api-shippee.nguyenconggioi.me',
  },
  production: {
    appUrl: 'https://shippee.nguyenconggioi.me',
    apiUrl: 'https://api-shippee.nguyenconggioi.me',
    WsUrl: 'wss://api-shippee.nguyenconggioi.me',
  },
};

export const getConfig = () => {
  const env = process.env.APP_ENV || 'local';

  return EnvironmentConfig[env];
};
