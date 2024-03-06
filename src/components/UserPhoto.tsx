import { Image } from '@gluestack-ui/themed';
import { Pressable } from 'react-native';

import defaultUserImage from '@/assets/defaultAvatar.png';

type Props = typeof Image & {
  size: number;
  borderWidth?: number;
  borderColor?: string;
  imageLink: string;
  onPress?: () => void;
};

export function UserPhoto({
  size,
  borderWidth = 3,
  borderColor = '$blue.500',
  imageLink,
  onPress = () => {},
  ...rest
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Image
        w={size}
        h={size}
        rounded="$full"
        borderWidth={borderWidth}
        borderColor={borderColor}
        alt="Foto de perfil do usuário"
        source={imageLink ? { uri: imageLink } : defaultUserImage}
        defaultSource={defaultUserImage}
        {...rest}
      />
    </Pressable>
  );
}
