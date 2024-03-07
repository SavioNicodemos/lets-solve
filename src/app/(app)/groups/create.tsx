import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Center, Icon, IconButton, Spinner, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { AvatarUpload } from '@/components/AvatarUpload';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { IImageUpload } from '@/dtos/ComplaintDTO';
import { useCreateGroup } from '@/hooks/mutations/useCreateGroup';
import { IImageUploadSchema } from '@/schemas/Image';
import { handleError } from '@/utils/handleError';

export { ErrorBoundary } from '@/components/ErrorBoundary';

export default function CreateGroup() {
  const { control, handleSubmit } = useForm<ICreateGroup>({
    resolver: zodResolver(createGroupSchema),
  });

  const { mutateAsync, isPending } = useCreateGroup();

  const submitForm = async (data: ICreateGroup) => {
    try {
      const newGroup = await mutateAsync(data);

      router.replace(`/groups/${newGroup.id}`);
    } catch (error) {
      handleError(error, 'Erro ao criar grupo');
    }
  };

  return (
    <VStack bgColor="gray.600" flex={1} pt={12}>
      <Header
        title="Criar grupo"
        px={6}
        RightIconComponent={
          isPending ? (
            <Spinner color="green.500" size="sm" />
          ) : (
            <IconButton
              rounded="full"
              icon={
                <Icon as={Feather} name="check" size="lg" color="green.500" />
              }
              onPress={handleSubmit(submitForm)}
            />
          )
        }
      />

      <Center px={6}>
        <Controller
          control={control}
          name="image"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <AvatarUpload
              size={150}
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              placeholder="Nome do grupo"
              value={value}
              onChangeText={onChange}
              errorMessage={error?.message}
              mt={6}
            />
          )}
        />
      </Center>
    </VStack>
  );
}

const createGroupSchema = z.object({
  image: IImageUploadSchema.refine(
    (file: IImageUpload) => file?.type.startsWith('image/'),
    'O arquivo deve ser uma imagem',
  ),

  name: z.string().min(1, 'Nome do grupo é obrigatório'),
});

type ICreateGroup = z.infer<typeof createGroupSchema>;
