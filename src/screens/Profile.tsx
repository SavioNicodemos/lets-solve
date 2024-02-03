import { AvatarUpload } from '@components/AvatarUpload';
import { Header } from '@components/Header';
import { useAuth } from '@hooks/useAuth';
import { Center, Heading, VStack } from 'native-base';

export function Profile() {
  const { user, updateUserAvatar } = useAuth();

  return (
    <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
      <Header title="Editar Perfil" />

      <Center>
        <AvatarUpload
          size={40}
          onChange={image => updateUserAvatar(image)}
          value={{ isExternal: !!user.avatar, path: user.avatar || '' }}
        />

        <Heading fontSize="lg" color="gray.100">
          {user.name}
        </Heading>

        <Heading fontSize="md" color="gray.200">
          {user.email}
        </Heading>

        <Heading fontSize="md" color="gray.200">
          {user.tel}
        </Heading>
      </Center>
    </VStack>
  );
}
