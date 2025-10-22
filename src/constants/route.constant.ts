export const RoutesMap = {
  AUTH: {
    SIGN_IN: '/login',
  },
  CORE_ROUTES_SETTING: {
    GENERAL: '/general',
    USER: '/users',
    OTHER: '/other',
    PERMISSION: '/permission',
  },
};

export const CORE_ROUTES_SETTING_METADATA = Object.entries(
  RoutesMap.CORE_ROUTES_SETTING
).map(([key, value]) => ({
  label: key.charAt(0) + key.slice(1).toLowerCase(),
  value: key,
  href: value,
}));
