import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Logo from '@assets/Logo.svg';
import { AvatarUpload } from '@components/AvatarUpload';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ICreateUser } from '@dtos/UserDTO';
import { api } from '@services/api';
import { handleError } from '@utils/handleError';

const createUserSchema = yup.object({
  avatar: yup.mixed().required('É necessário escolher uma foto de perfil'),

  name: yup.string().required('Informe o nome de usuário'),

  email: yup
    .string()
    .email('Formato de e-mail errado')
    .required('Informe um email'),

  tel: yup
    .number()
    .typeError('Please enter only numeric values')
    .nullable()
    .required('Informe um telefone')
    .min(0),

  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .transform(value => value || null)
    .required('Informe uma senha'),

  confirm_password: yup
    .string()
    .nullable()
    .transform(value => value || null)
    .oneOf([yup.ref('password')], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: schema =>
        schema
          .nullable()
          .required('Informe a confirmação da senha.')
          .transform(value => value || null),
    }),
});

export function SignUp() {
  const navigation = useNavigation();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({
    resolver: yupResolver(createUserSchema),
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCreateUser = async (data: ICreateUser) => {
    try {
      const formData = new FormData();
      formData.append('avatar', data.avatar as any);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('tel', data.tel);
      formData.append('password', data.password);

      await api.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
            Crie a sua conta, junte-se ao seu grupo e resolva tudo da maneira mais
            simples possível.
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
