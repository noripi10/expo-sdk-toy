// import AudioManager from '@/libs/audio';
import { useAudioManager } from '@/hooks/useAudioManager';
import { Button, ButtonGroup, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';
import { useEffect } from 'react';

export const Sound = () => {
  const { isReady, playAsync, pauseAsync, stopAsync, status, audioState } = useAudioManager();

  // const [soundStatus, setSoundStatus] = useState<AVPlaybackStatusSuccess>();
  // useEffect(() => {
  //   // AudioManager.play();

  //   return () => {
  //     AudioManager.stop();
  //   };
  // });

  let position = '';
  let duration = '';
  if (audioState) {
    let date = new Date(audioState.positionMillis);
    position = `${date.getMinutes()}分${date.getSeconds()}秒`;
    date = new Date(audioState?.durationMillis ?? '');
    duration = `${date.getMinutes()}分${date.getSeconds()}秒`;
  }

  useEffect(() => {}, [audioState]);

  return (
    <VStack alignItems='center' gap={'$0.5'} borderColor='$blueGray700' borderWidth={1} p={'$1'}>
      <Text pt={'$1'} pb={'$1.5'}>
        status: {status} status:{position} duration: {duration}
      </Text>
      <HStack justifyContent='center'>
        <ButtonGroup gap={'$0.5'} isDisabled={!isReady}>
          <Button
            onPress={async () => {
              // const status = await AudioManager.play();
              // if (status && !('error' in status)) {
              //   setSoundStatus(status as AVPlaybackStatusSuccess);
              // }
              await playAsync();
            }}
            action='primary'
          >
            <ButtonText>Play</ButtonText>
          </Button>
          <Button
            onPress={async () => {
              // const status = await AudioManager.pause();
              // if (status && !('error' in status)) {
              //   setSoundStatus(status as AVPlaybackStatusSuccess);
              // }
              await pauseAsync();
            }}
            action='positive'
          >
            <ButtonText>Pause</ButtonText>
          </Button>
          <Button
            onPress={async () => {
              // const status = await AudioManager.stop();
              // if (status && !('error' in status)) {
              //   setSoundStatus(status as AVPlaybackStatusSuccess);
              // }
              await stopAsync();
            }}
            action='negative'
          >
            <ButtonText>Stop</ButtonText>
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  );
};
