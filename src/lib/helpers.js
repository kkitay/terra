const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

export const isDev = isEnvSet ? getFromEnv : false;

export const assetsPath = isDev ? '/assets' : './assets';
