import { Image } from 'react-native';
import { ImageFrame } from '@/components/svg';
import { Box, Center, Text } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BORDER_WIDTH = 12;

export default function SvgImagePage() {
  const inset = useSafeAreaInsets();

  return (
    <Box flex={1} pt={inset.top}>
      <Center flex={0.9}>
        <Center position='relative'>
          <Image
            source={{ uri: 'https://source.unsplash.com/JkWmf8yyNxg' }}
            width={180 + BORDER_WIDTH}
            height={220 + BORDER_WIDTH}
            alt='img'
            resizeMode='cover'
            style={{
              left: 0,
              top: 0,
              borderWidth: BORDER_WIDTH,
              borderColor: '#e79b03',
            }}
          />
          <Box position='absolute'>
            <ImageFrame fill={'#ffff00'} width={200} />
          </Box>
        </Center>
      </Center>
      <Center flex={1} />
    </Box>
  );
}
