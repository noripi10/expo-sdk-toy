import { Box, Button, ButtonText, Center, Text } from '@gluestack-ui/themed';
import { useRef, useState } from 'react';
import { DimensionValue, Dimensions, FlatList, ScrollView, StyleSheet } from 'react-native';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';

import type { GeoJsonProperties } from 'geojson';
import { useClusterer, type supercluster } from 'react-native-clusterer';
import { GifuStations, StationProp } from '@/constants/map';
import { MapDimensions } from 'react-native-clusterer/lib/typescript/types';
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

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [mapLayout, setMapLayout] = useState<MapDimensions>({ width: WIDTH, height: HEIGHT });
  const [region, setRegion] = useState<Region>({
    latitude: 35.422401,
    longitude: 136.708525,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [detail, setDetail] = useState<GeoJson[]>();

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

  const getMarkerSize = (count: number): DimensionValue => {
    if (count > 100) {
      return 72;
    } else if (count > 50) {
      return 64;
    } else if (count > 30) {
      return 56;
    } else if (count > 20) {
      return 48;
    } else if (count > 10) {
      return 40;
    } else {
      return 32;
    }
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
        {points.map((p, i) => {
          const stringCount = String(p.properties?.point_count ?? '1');
          const count = parseInt(stringCount, 10);

          // latitude: p.geometry.coordinates[1], longitude: p.geometry.coordinates[0]
          const isSelected =
            marker?.latitude === p.geometry.coordinates[1] && marker.longitude === p.geometry.coordinates[0];

          return (
            <Marker
              key={i.toString()}
              coordinate={{
                latitude: p.geometry.coordinates[1],
                longitude: p.geometry.coordinates[0],
              }}
              onPress={() => {
                // marker point
                setMarker({ latitude: p.geometry.coordinates[1], longitude: p.geometry.coordinates[0] });
                // flat marker data
                if (count === 1) {
                  setDetail([p]);
                } else {
                  const result = getClusterPoints(p);
                  console.info('lenght', result.length);
                  setDetail(result);
                }
                // flatlist scroll (first)
                setTimeout(() => {
                  flatListRef.current?.scrollToIndex({
                    animated: true,
                    index: 0,
                  });
                }, 300);
              }}
            >
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
            </Marker>
          );
        })}
      </MapView>
      <Box position='absolute' right={12} top={insets.top + 8}>
        <Button onPress={() => setScrollEnabled((p) => !p)} bgColor={scrollEnabled ? '$teal400' : '$red400'}>
          <ButtonText>Toggle Scroll Enable</ButtonText>
        </Button>
      </Box>
      <Box position='absolute' left={0} right={0} bottom={0} h={'$64'}>
        <Box position='absolute' style={StyleSheet.absoluteFillObject} bgColor='#000' opacity={0.2} />
        <FlatList
          ref={flatListRef}
          horizontal
          data={detail}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Box
              flex={1}
              p={'$4'}
              w={WIDTH * 0.95}
              maxWidth={400}
              borderRadius={'$xl'}
              borderWidth={'$1'}
              m={'$2'}
              bg='$backgroundDark800'
            >
              <ScrollView>
                <Text>{JSON.stringify(item)}</Text>
              </ScrollView>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
