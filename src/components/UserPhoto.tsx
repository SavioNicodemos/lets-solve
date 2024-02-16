import { IImageProps, Image } from 'native-base';
import { ColorType } from 'native-base/lib/typescript/components/types';
import { Pressable } from 'react-native';

import defaultUserImage from '@/assets/defaultAvatar.png';

type Props = IImageProps & {
  size: number;
  borderWidth?: number;
  borderColor?: ColorType;
  imageLink: string;
  onPress?: () => void;
};

export function UserPhoto({
  size,
  borderWidth = 3,
  borderColor = 'blue.500',
  imageLink,
  onPress = () => {},
  ...rest
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Image
        w={size}
        h={size}
        rounded="full"
        borderWidth={borderWidth}
        borderColor={borderColor}
        alt="Foto de perfil do usuário"
        source={imageLink ? { uri: imageLink } : defaultUserImage}
        fallbackSource={defaultUserImage}
        {...rest}
      />
    </Pressable>
  );
}
