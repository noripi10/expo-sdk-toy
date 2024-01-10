import { avatarImagebase64 } from '@/constants/image';
import { Box, Button, ButtonText, Center } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Polyline, Rect, Svg } from 'react-native-svg';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function NuriePage() {
  const router = useRouter();

  return (
    <Center bgColor='$white' flex={1}>
      <Image
        style={[StyleSheet.absoluteFillObject, { zIndex: -1 }]}
        alt='base64 image'
        source={{
          uri: `data:iamge/png;base64,${avatarImagebase64}`,
        }}
        width={width}
        height={height}
        resizeMethod='resize'
        resizeMode='contain'
      />
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'100,100 140,100'} />
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'80,120 160,120'} />
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'120,120 100,180'} />

        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'180,100 240,100 180,180'} />
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'210,140 230,180'} />

        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'280,100 280,180'} />
        <Polyline fill='none' stroke={'#000'} strokeWidth={1} points={'280,140 300,140'} />
      </Svg>

      <Box position='absolute' bottom={100} justifyContent='center'>
        <Button onPress={() => router.replace('/(auth)/hero')}>
          <ButtonText>Go back</ButtonText>
        </Button>
      </Box>
    </Center>
  );
}
