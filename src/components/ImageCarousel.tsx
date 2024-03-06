import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  View,
} from '@gluestack-ui/themed-native-base';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import noComplaint from '@/assets/noComplaint.png';
import { IImageUpload, ImagesDTO } from '@/dtos/ComplaintDTO';

type Props = {
  images: (ImagesDTO | IImageUpload)[];
  isDisabled?: boolean;
};

export function ImageCarousel({ images, isDisabled }: Props) {
  const { width } = Dimensions.get('window');
  const imagesArray = images.length ? images : [noComplaint];
  const [viewingImageIndex, setViewingImageIndex] = useState(0);
  return (
    <View zIndex={1}>
      <Carousel
        width={width}
        height={width / 1.34}
        data={imagesArray}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 50,
        }}
        pagingEnabled
        snapEnabled
        enabled={!!images.length}
        onSnapToItem={index => setViewingImageIndex(index)}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Image
              source={
                images.length
                  ? {
                      uri: item.path,
                    }
                  : noComplaint
              }
              resizeMode="cover"
              alt="."
              width="full"
              h="full"
            />
            {isDisabled ? (
              <Box
                bg="#0000006D"
                height={307}
                width={400}
                mt={-4}
                p={2}
                justifyContent="center"
                zIndex={2}
                position="absolute"
                alignItems="center"
              >
                <Text color="white" fontSize="xs" fontWeight="bold">
                  {'Resolve desativado'.toUpperCase()}
                </Text>
              </Box>
            ) : null}
          </View>
        )}
      />
      <Center mt={-9} mb={2}>
        <HStack space={1} bg="#0000005f" p="2" rounded="full">
          {images.map((item, index) => (
            <View
              key={Math.random()}
              h="2"
              w="2"
              bg={viewingImageIndex === index ? 'gray.700' : 'gray.300'}
              rounded="full"
            />
          ))}
        </HStack>
      </Center>
    </View>
  );
}
