import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Box, FormControl, HStack, Icon, IconButton, Image } from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import noComplaintImage from '@/assets/noComplaint.png';
import { IImageUpload } from '@/dtos/ComplaintDTO';
import { useToast } from '@/hooks/useToast';
import { handleError } from '@/utils/handleError';

type Props = {
  onChange: (value: IImageUpload[]) => void;
  value: IImageUpload[];
  errorMessage?: string | null;
};

export function UploadPicturesContainer({
  onChange = () => {},
  value = [],
  errorMessage,
}: Props) {
  const isInvalidField = !!errorMessage;

  const [photos, setPhotos] = useState<IImageUpload[]>(value);

  const toast = useToast();

  const handleUserPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 3],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoUri = photoSelected.assets[0].uri;
        const photoInfo = (await FileSystem.getInfoAsync(photoUri, {
          size: true,
        })) as { size: number };

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          toast.error('Essa imagem é muito grande. Escolha uma de até 5MB');
          return;
        }

        const photoName = photoSelected.assets[0].uri
          .split('/')
          .pop() as string;
        const fileExtension = photoName.split('.').pop();

        const photoFile = {
          name: photoName,
          uri: photoSelected.assets[0].uri,
          path: photoSelected.assets[0].uri,
          isExternal: false as const,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        };

        setPhotos(prev => {
          const photosUpdated = [...prev, photoFile];
          onChange(photosUpdated);

          return photosUpdated;
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleRemovePhoto = (photoIndex: number) => {
    const photosArray = [...photos];
    if (photoIndex > -1 && photoIndex < photosArray.length) {
      photosArray.splice(photoIndex, 1);
    }
    onChange(photosArray);
    setPhotos(photosArray);
  };

  return (
    <FormControl isInvalid={isInvalidField} mb={4}>
      <HStack space={5}>
        {photos.length
          ? photos.map((photo, index) => (
              <Box mt="4" mb="8" key={photo.path}>
                <IconButton
                  icon={
                    <Icon as={Feather} name="x" color="red.500" size="lg" />
                  }
                  onPress={() => handleRemovePhoto(index)}
                  rounded="full"
                  bg="#0000000f"
                  p="1"
                  position="absolute"
                  zIndex={1}
                  right={0}
                />
                <Image
                  justifyContent="center"
                  h="100"
                  w="100"
                  rounded="lg"
                  bg="gray.500"
                  alt="Foto da queixa"
                  src={photo.path}
                  fallbackSource={noComplaintImage}
                />
              </Box>
            ))
          : null}

        {photos.length < 3 ? (
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Box
              alignItems="center"
              justifyContent="center"
              h="100"
              w="100"
              rounded="lg"
              bg="gray.500"
              mt="4"
            >
              <Icon as={Feather} name="plus" color="gray.400" size="lg" />
            </Box>
          </TouchableOpacity>
        ) : null}
      </HStack>
      <FormControl.ErrorMessage
        _text={{ color: 'red.500' }}
        bg="red.100"
        rounded="full"
        mt={2}
        px={2}
        pb={1}
        mb={6}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
