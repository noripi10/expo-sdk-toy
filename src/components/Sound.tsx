import { useEffect } from 'react';

import AudioManager from '@/libs/audio';
import { Button, ButtonText, HStack } from '@gluestack-ui/themed';

export const Sound = () => {
  useEffect(() => {
    // AudioManager.play();

    return () => {
      AudioManager.stop();
    };
  });

  return (
    <HStack>
      <Button onPress={() => AudioManager.play()}>
        <ButtonText>Play</ButtonText>
      </Button>
      <Button onPress={() => AudioManager.stop()}>
        <ButtonText>Stop</ButtonText>
      </Button>
    </HStack>
  );
};
