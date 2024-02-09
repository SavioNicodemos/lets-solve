import { Button, Center, Heading, VStack } from 'native-base';
import { Alert } from 'react-native';

import { AvatarUpload } from '@/components/AvatarUpload';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user, updateUserAvatar, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: () => signOut(),
      },
    ]);
  };

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

        <Button size="lg" variant="link" mt={8} onPress={handleSignOut}>
          Sair
        </Button>
      </Center>
    </VStack>
  );
}
