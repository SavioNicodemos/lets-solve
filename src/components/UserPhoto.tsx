import defaultUserImage from '@assets/defaultAvatar.png';
import { api } from '@services/api';
import { IImageProps, Image } from 'native-base';
import { ColorType } from 'native-base/lib/typescript/components/types';

type Props = IImageProps & {
  isExternalImage?: boolean;
  size: number;
  borderWidth?: number;
  borderColor?: ColorType;
  imageLink: string;
};

export function UserPhoto({
  isExternalImage = true,
  size,
  borderWidth = 3,
  borderColor = 'blue.500',
  imageLink,
  ...rest
}: Props) {
  const imagePath = isExternalImage
    ? `${api.defaults.baseURL?.replace(
        '/api/v1',
        '',
      )}/storage/avatars/${imageLink}`
    : imageLink;

  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={borderWidth}
      borderColor={borderColor}
      alt="Foto de perfil do usuário"
      source={imageLink ? { uri: imagePath } : defaultUserImage}
      fallbackSource={defaultUserImage}
      {...rest}
    />
  );
}
