import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Box, FormControl, IBoxProps, Icon, IconButton } from 'native-base';
import { useState } from 'react';

import { IImageUpload } from '@/dtos/ComplaintDTO';
import { AppError } from '@/utils/AppError';
import { handleError } from '@/utils/handleError';

import { UserPhoto } from './UserPhoto';

type Props = IBoxProps & {
  value: ImageProp;
  onChange: (file: IImageUpload) => void;
  errorMessage?: string;
};

export function AvatarUpload({
  errorMessage = '',
  value,
  onChange = () => {},
  size = 24,
  ...props
}: Props) {
  const [image, setImage] = useState<ImageProp>(value);

  const handleUserPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [1, 1],
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
          throw new AppError('A imagem deve ter até 5Mb de tamanho.');
        }

        const photoName = photoSelected.assets[0].uri
          .split('/')
          .pop() as string;
        const fileExtension = photoName.split('.').pop();

        const photoFile = {
          name: photoName,
          uri: photoSelected.assets[0].uri,
          path: photoSelected.assets[0].uri,
          isExternal: false,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        };

        setImage(photoFile);
        onChange(photoFile);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <FormControl isInvalid={!!errorMessage} mb={4} alignItems="center">
      <Box mt="4" width={size} height={size} {...props}>
        <UserPhoto size={Number(size)} imageLink={image?.path} />
        <IconButton
          position="absolute"
          bottom="-5"
          right="-5"
          bg="blue.500"
          icon={<Icon as={Feather} name="edit-3" size="6" />}
          _icon={{
            color: 'white',
          }}
          borderRadius="full"
          onPress={handleUserPhotoSelect}
        />
      </Box>
      <FormControl.ErrorMessage
        _text={{ color: 'red.500' }}
        bg="red.100"
        borderBottomLeftRadius="sm"
        borderBottomRightRadius="sm"
        mt={2}
        px={2}
        pb={1}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

type ImageProp = {
  isExternal: boolean;
  path: string;
};
