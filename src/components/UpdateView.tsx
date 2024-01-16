import { useEffect, useState } from 'react';

import { Box, Button, ButtonText, HStack, Text } from '@gluestack-ui/themed';
import * as Updates from 'expo-updates';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const UpdateView = () => {
  const { top } = useSafeAreaInsets();
  const [isUpdateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const subscribe = Updates.addListener((event) => {
      console.info(event.type);
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        setUpdateAvailable(true);
      }
    });

    return () => {
      subscribe.remove();
    };
  }, []);

  const cancel = () => setUpdateAvailable(false);

  const reload = () => Updates.reloadAsync();

  if (!isUpdateAvailable) {
    return null;
  }

  return (
    <Animated.View entering={FadeInUp}>
      <HStack py={top} justifyContent='space-evenly' alignItems='center'>
        <Text>Update Available</Text>
        <HStack gap={'$1'}>
          <Button size='xs' action='positive' onPress={reload}>
            <ButtonText>Update</ButtonText>
          </Button>
          <Box p='$1' />
          <Button size='xs' action='negative' onPress={cancel}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </HStack>
      </HStack>
    </Animated.View>
  );
};
