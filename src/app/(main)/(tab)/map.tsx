import { Box, Button, ButtonText, Center, Pressable, Text } from '@gluestack-ui/themed';
import { memo, useEffect, useRef, useState } from 'react';
import { Alert, DimensionValue, Dimensions, FlatList, ScrollView, StyleSheet } from 'react-native';
import MapView, { LatLng, MapMarker, Marker, Region } from 'react-native-maps';

import { GifuStations, StationProp } from '@/constants/map';
import { FontAwesome } from '@expo/vector-icons';
import type { GeoJsonProperties } from 'geojson';
import { type supercluster, useClusterer } from 'react-native-clusterer';
import { MapDimensions } from 'react-native-clusterer/lib/typescript/types';
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type GeoJson = supercluster.PointFeature<GeoJsonProperties> | supercluster.ClusterFeatureClusterer<GeoJsonProperties>;
const toGeoJson = (stationProps: StationProp): GeoJson => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [stationProps.lng, stationProps.lat],
  },
  properties: {
    id: stationProps.name,
  },
});
const gifuStationGeoJsons = GifuStations.map(toGeoJson);

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function MayPage() {
  const insets = useSafeAreaInsets();

  const mapRef = useRef<MapView>(null);
  const flatListRef = useRef<FlatList>(null);

  const markerRefs = useRef<{ current: MapMarker | null }[]>(
    new Array(GifuStations.length).map(() => ({ current: null }))
  ).current;

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [mapLayout, setMapLayout] = useState<MapDimensions>({ width: WIDTH, height: HEIGHT });
  const [region, setRegion] = useState<Region>({
    latitude: 35.422401,
    longitude: 136.708525,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerDetail, setMarkerDetail] = useState<GeoJson[]>();

  const [points, supercluster] = useClusterer(gifuStationGeoJsons, mapLayout, region);

  const [marker, setMarker] = useState<LatLng>();

  const getClusterPoints = (p: GeoJson): GeoJson[] => {
    const chidlClusterOrPoint = supercluster.getChildren(parseInt((p.id ?? '0') as string));

    // 再帰でデータをフラットにする
    return chidlClusterOrPoint
      .map((p) => {
        if (!p.properties?.point_count) {
          return [p];
        }
        return getClusterPoints(p);
      })
      .flatMap((e) => e);
  };

  return (
    <Box flex={1}>
      <MapView
        ref={mapRef}
        liteMode={true}
        style={styles.map}
        initialRegion={region}
        scrollEnabled={scrollEnabled}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setMapLayout({ width, height });

          const coordinates: LatLng[] = gifuStationGeoJsons.map((station) => ({
            latitude: station.geometry.coordinates[1],
            longitude: station.geometry.coordinates[0],
          }));

          mapRef.current?.fitToCoordinates(coordinates, {
            animated: true,
          });
        }}
        onRegionChangeComplete={(e) => {
          setRegion(e);
        }}
        onPanDrag={(e) => {
          // console.info(e.nativeEvent.coordinate);
        }}
      >
        {points.map((p, i) => (
          <ClustererMarker
            key={i.toString()}
            p={p}
            marker={marker}
            onPressMarker={() => {
              const stringCount = String(p.properties?.point_count ?? '1');
              const count = parseInt(stringCount, 10);
              // marker point
              setMarker({ latitude: p.geometry.coordinates[1], longitude: p.geometry.coordinates[0] });

              // flat marker data
              if (count === 1) {
                setMarkerDetail([p]);
              } else {
                const result = getClusterPoints(p);
                setMarkerDetail(result);
              }

              // set region
              mapRef.current?.animateToRegion({
                ...region,
                latitude: p.geometry.coordinates[1],
                longitude: p.geometry.coordinates[0],
              });

              // flatlist scroll (first)
              setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                  animated: true,
                  index: 0,
                });
              }, 300);
            }}
            innerRef={markerRefs[i]}
          />
        ))}
      </MapView>
      <Box position='absolute' right={12} top={insets.top + 8}>
        <Button onPress={() => setScrollEnabled((p) => !p)} bgColor={scrollEnabled ? '$teal400' : '$red400'}>
          <ButtonText>Toggle Scroll Enable</ButtonText>
        </Button>
      </Box>
      {markerDetail && (
        <Animated.View entering={FadeIn.delay(500)}>
          <Box position='absolute' left={0} right={0} bottom={0} h={'$64'}>
            <Box position='absolute' style={StyleSheet.absoluteFillObject} bgColor='#000' opacity={0.2} />
            <Box flex={1}>
              <FlatList
                style={{ flex: 1 }}
                ref={flatListRef}
                horizontal
                data={markerDetail}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Box
                    flex={1}
                    p={'$4'}
                    w={WIDTH * 0.95}
                    mx={(WIDTH * 0.05) / 2}
                    my={'$2'}
                    maxWidth={400}
                    borderRadius={'$xl'}
                    borderWidth={'$1'}
                    bg='$backgroundDark800'
                  >
                    <ScrollView>
                      <Text>{JSON.stringify(item)}</Text>
                    </ScrollView>
                  </Box>
                )}
              />
            </Box>
            <Box position='absolute' top={-30} right={8}>
              <Pressable
                accessibilityLabel='close detail'
                borderRadius={'$xl'}
                w={'$12'}
                h={'$8'}
                bgColor={'#ccc'}
                justifyContent='center'
                alignItems='center'
                shadowOffset={{ width: 0, height: 1 }}
                shadowColor={'$amber100'}
                shadowOpacity={0.5}
                onPress={() => {
                  setMarker(undefined);
                  setMarkerDetail(undefined);
                }}
              >
                <FontAwesome name='close' color={'#000'} size={18} />
              </Pressable>
            </Box>
          </Box>
        </Animated.View>
      )}
    </Box>
  );
}

const getMarkerSize = (count: number): DimensionValue => {
  if (count > 100) {
    return 72;
  }
  if (count > 50) {
    return 64;
  }
  if (count > 30) {
    return 56;
  }
  if (count > 20) {
    return 48;
  }
  if (count > 10) {
    return 40;
  }
  return 32;
};

const ClustererMarker = memo(
  ({
    p,
    marker,
    onPressMarker,
    innerRef,
  }: {
    p: GeoJson;
    marker?: LatLng;
    onPressMarker: () => void;
    innerRef: {
      current: MapMarker | null;
    };
  }) => {
    const stringCount = String(p.properties?.point_count ?? '1');
    const count = parseInt(stringCount, 10);
    const isSelected = marker?.latitude === p.geometry.coordinates[1] && marker.longitude === p.geometry.coordinates[0];

    const animationValue = useSharedValue(1);

    const animationStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: animationValue.value }],
      };
    });

    useEffect(() => {
      if (isSelected) {
        animationValue.value = withRepeat(withTiming(1.15, { duration: 1000, easing: Easing.steps(5) }), -1, true);
      } else {
        animationValue.value = 1;
        cancelAnimation(animationValue);
      }

      return () => {
        animationValue.value = 1;
      };
    }, [animationValue, isSelected]);

    return (
      <Marker
        ref={innerRef}
        coordinate={{
          latitude: p.geometry.coordinates[1],
          longitude: p.geometry.coordinates[0],
        }}
        onPress={onPressMarker}
      >
        <Animated.View style={animationStyle} entering={FadeIn.delay(100)} exiting={FadeOut.delay(100)}>
          <Center
            flex={1}
            w={getMarkerSize(count)}
            h={getMarkerSize(count)}
            p={'$1'}
            borderColor='$blue800'
            borderWidth={'$2'}
            borderRadius={'$full'}
            bgColor={isSelected ? '$blue500' : '$blue50'}
          >
            <Text color='#000' fontWeight='$bold'>
              {stringCount}
            </Text>
          </Center>
        </Animated.View>
      </Marker>
    );
  }
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
