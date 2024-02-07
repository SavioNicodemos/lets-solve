import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import {
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@assets/Logo.svg';
import { AvatarUpload } from '@components/AvatarUpload';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ICreateUser } from '@dtos/UserDTO';
import { api } from '@services/api';
import { handleError } from '@utils/handleError';

export default function SignUp() {
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ICreateUser>({
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    resolver: zodResolver(createUserSchema),
  });

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
      const formData = new FormData();
      formData.append('avatar', data.avatar as any);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('tel', data.tel);
      formData.append('password', data.password);

      await api.postForm('/users', formData);
      toast.show({
        title: 'Usuário criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });
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
          name="tel"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Telefone"
              isInvalid={false}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.tel?.message}
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

const createUserSchema = z.object({
  avatar: z
    .any({ required_error: 'É necessário escolher uma foto de perfil' })
    .refine(
      file => file?.type.startsWith('image/'),
      'O arquivo deve ser uma imagem',
    ),

  name: z
    .string({ required_error: 'Informe o nome de usuário' })
    .min(1, 'Informe o nome de usuário'),

  email: z
    .string({ required_error: 'Informe um email' })
    .min(1, 'Informe um email')
    .email('Formato de e-mail errado'),

  tel: z
    .string({
      required_error: 'Informe um telefone',
    })
    .min(1, 'Informe um telefone')
    .refine(data => !Number.isNaN(Number(data)), {
      message: 'Please enter only numeric values',
    }),

  password: z
    .string({ required_error: 'Informe uma senha' })
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),

  confirm_password: z
    .string({
      required_error: 'Informe uma confirmação de senha',
    })
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});
