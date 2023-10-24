import { ExpoConfig, ConfigContext } from 'expo/config';

import withAppleSettings, { Switch } from '@config-plugins/apple-settings';

import appJson from './app.json';

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return withAppleSettings(
    {
      ...config,
      name: appJson.expo.name,
      slug: appJson.expo.scheme,
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
