import { useEffect, useState } from 'react';
import { Settings } from 'react-native';

export const useUpdateSettings = () => {
  const [setting, setSetting] = useState(true);

  const globalSetting = (val: any) => {
    Settings.set({ p_my_custom_setting_1: Boolean(val) });
    setSetting(Boolean(val));
  };

  useEffect(() => {
    console.log('useUpdateSettings useEffect');
    let isMounted = true;

    const oldVal = Settings.get('p_my_custom_setting_1');
    setSetting(Boolean(oldVal));

    const id = Settings.watchKeys('p_my_custom_setting_1', () => {
      if (isMounted) {
        const val = Settings.get('p_my_custom_setting_1');
        console.info('p_my_custom_setting_1', val);
        setSetting(Boolean(val));
      }
    });

    return () => {
      Settings.clearWatch(id);
      isMounted = false;
    };
  }, []);
  return { setting, globalSetting };
};
