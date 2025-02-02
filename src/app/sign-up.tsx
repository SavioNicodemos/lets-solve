import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Center, Heading, ScrollView, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';

import Logo from '@/assets/Logo.svg';
import { AvatarUpload } from '@/components/AvatarUpload';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { handleError } from '@/utils/handleError';
import { useToast } from '@/features/shared/hooks/useToast';
import { useCreateUser } from '@/features/users/mutations';
import { ICreateUser } from '@/features/users/types';
import { createUserSchema } from '@/features/users/schemas';

export default function SignUp() {
  const toast = useToast();

  const { isPending, mutateAsync } = useCreateUser();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ICreateUser>({
    resolver: zodResolver(createUserSchema),
  });

  const isLoading = isPending || isSubmitting;

  const handleGoBack = () => {
    router.back();
  };

  const handleCreateUser = async (data: ICreateUser) => {
    if (data.password !== data.confirm_password) {
      setError('confirm_password', {
        message: 'As senhas não coincidem',
      });
      return;
    }
    try {
      await mutateAsync(data);

      toast.success('Usuário criado com sucesso!');

      handleGoBack();
    } catch (error: any) {
      handleError(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        bgColor="gray.600"
        borderBottomLeftRadius="3xl"
        borderBottomRightRadius="3xl"
        px={12}
        pt={12}
        flex={1}
      >
        <Center>
          <Logo height={40} width={60} />
          <Heading fontSize="lg" color="gray.100" mt={4}>
            Boas vindas!
          </Heading>
          <Text color="gray.200" fontSize="sm" textAlign="center" mt={2}>
            Crie a sua conta, junte-se ao seu grupo e resolva tudo da maneira
            mais simples possível.
          </Text>

          <Center>
            <Controller
              control={control}
              name="avatar"
              render={({ field: { value, onChange } }) => (
                <AvatarUpload
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.avatar?.message}
                />
              )}
            />
          </Center>
        </Center>

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Nome"
              isInvalid={false}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
              mt={4}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="E-mail"
              isInvalid={false}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Confirmar senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors.confirm_password?.message}
            />
          )}
        />

        <Button
          title="Criar"
          variant="primary"
          mt="4"
          onPress={handleSubmit(handleCreateUser)}
          isDisabled={isLoading}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" mt={12} textAlign="center">
          Já tem uma conta?
        </Text>
        <Button
          title="Ir para o login"
          variant="secondary"
          mt="4"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
