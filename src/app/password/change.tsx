import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { Center, Heading, ScrollView, VStack } from 'native-base';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import Logo from '@/assets/Logo.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Loading from '@/components/Loading';
import { useUpdatePassword } from '@/hooks/mutations/useUpdatePassword';
import { useValidatePasswordToken } from '@/hooks/queries/useValidatePasswordToken';
import { useToast } from '@/hooks/useToast';
import { passwordSchema } from '@/schemas/user';
import { handleError } from '@/utils/handleError';

export default function ChangePassword() {
  const toast = useToast();

  const { isValid: parametersAreValid, email, token } = useValidatedParams();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TPasswords>({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(
      z.object({
        password: passwordSchema,
        passwordConfirm: z
          .string()
          .min(8, 'Senha deve conter pelo menos 8 caracteres'),
      }),
    ),
  });

  const { isPending, mutateAsync: updatePassword } = useUpdatePassword();
  const { isLoading, isError } = useValidatePasswordToken(email, token);

  const handleUpdatePassword = async ({
    passwordConfirm,
    password,
  }: TPasswords) => {
    if (password !== passwordConfirm) {
      setError('passwordConfirm', {
        type: 'manual',
        message: 'As senhas não coincidem',
      });

      return;
    }

    try {
      await updatePassword({
        email,
        password,
        passwordConfirm,
        token,
      });

      toast.success('Senha atualizada com sucesso!');
      router.push('/sign-in');
    } catch (err: any) {
      handleError(err);
    }
  };

  if (!parametersAreValid) {
    return <Redirect href="/sign-in" />;
  }

  if (isError) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <VStack
          pt={24}
          bgColor="gray.600"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
        >
          <Center>
            <Logo height={80} width={200} />
            <Heading fontSize={24} color="gray.100">
              Atualizar senha
            </Heading>
          </Center>

          <Center py={12}>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange } }) => (
                    <Input
                      placeholder="Nova senha"
                      secureTextEntry
                      errorMessage={errors.password?.message}
                      onChangeText={onChange}
                      mt={4}
                      mx={8}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="passwordConfirm"
                  render={({ field: { onChange } }) => (
                    <Input
                      placeholder="Confirmação de senha"
                      secureTextEntry
                      errorMessage={errors.passwordConfirm?.message}
                      onChangeText={onChange}
                      mt={4}
                      mx={8}
                    />
                  )}
                />
              </>
            )}
          </Center>
          <Button
            title="Atualizar senha"
            variant="blue"
            mb="16"
            mt="4"
            mx={12}
            onPress={handleSubmit(handleUpdatePassword)}
            isDisabled={isSubmitting || isPending}
            isLoading={isSubmitting || isPending}
          />
        </VStack>
        <Button
          title="Voltar"
          variant="secondary"
          mt="4"
          mx={12}
          onPress={() => router.back()}
          isDisabled={isSubmitting}
        />
      </VStack>
    </ScrollView>
  );
}

const useValidatedParams = (): {
  isValid: boolean;
  email: string;
  token: string;
} => {
  const toast = useToast();

  const { email = '', token = '' } = useLocalSearchParams();

  let isValid = true;

  if (
    !email ||
    typeof email !== 'string' ||
    !token ||
    typeof token !== 'string'
  ) {
    isValid = false;
  }

  if (!isValid || Array.isArray(email) || Array.isArray(token)) {
    toast.error('Invalid parameters');
    return { isValid, email: '', token: '' };
  }

  return { isValid, email, token };
};

type TPasswords = {
  password: string;
  passwordConfirm: string;
};
