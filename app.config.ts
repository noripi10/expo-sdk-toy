import { ExpoConfig, ConfigContext } from 'expo/config';

import withAppleSettings, { Group, Switch, Title } from '@config-plugins/apple-settings';

import appJson from './app.json';

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return withAppleSettings(
    {
      ...config,
      name: appJson.expo.name,
      slug: appJson.expo.scheme,
      extra: {
        ...config.extra,
        UN_AUTHENTICATION: process.env.UN_AUTHENTICATION,
      },
    },
    {
      Root: {
        page: {
          PreferenceSpecifiers: [
            Switch({
              title: 'My Custom Setting 1',
              key: 'p_my_custom_setting_1',
              value: true,
            }),
            Group({
              title: 'About',
              footerText: 'Built by Noripi10 \nPowerd by Expo Δ',
            }),
            Title({
              title: 'Version',
              value: appJson.expo.version,
              key: 'p_app_version',
            }),
          ],
        },
        locales: {},
      },
    }
  );
};

const panes = {
  Root: {
    page: {
      PreferenceSpecifiers: [
        Switch({
          title: 'My Custom Setting 1',
          key: 'p_my_custom_setting_1',
          value: true,
        }),
      ],
    },
  },
};

Object.entries(panes).map(([key, pane]) => {});
