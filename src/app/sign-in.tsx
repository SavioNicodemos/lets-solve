import { router } from 'expo-router';
import {
  Center,
  Heading,
  Button as NButton,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';

import Logo from '@/assets/Logo.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { handleError } from '@/utils/handleError';

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { signIn, isLoadingUserStorageData: isLoading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  async function handleSignIn({ email, password }: FormData) {
    try {
      await signIn(email, password);
    } catch (error) {
      handleError(error);
    }
  }

  const handleGoToNewAccount = () => {
    router.push('/sign-up');
  };

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
            <Heading fontSize={35} color="gray.100">
              Resolve Ai
            </Heading>
            <Text color="gray.300" fontSize="sm">
              Seu território neutro de resolução de problemas
            </Text>
          </Center>

          <Center px={12}>
            <Text color="gray.200" fontSize="sm" mt={16}>
              Acesse sua conta
            </Text>

            <Controller
              control={control}
              name="email"
              rules={{ required: 'Informe o e-mail' }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  errorMessage={errors.email?.message}
                  onChangeText={onChange}
                  mt={4}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: 'Informe a senha' }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </Center>

          <Button
            title="Entrar"
            variant="blue"
            mb="12"
            mt="4"
            mx={12}
            onPress={handleSubmit(handleSignIn)}
            isDisabled={isSubmitting || isLoading}
            isLoading={isSubmitting || isLoading}
          />

          <NButton
            variant="link"
            mb={4}
            onPress={() => router.push('/password/forgot')}
            isDisabled={isSubmitting}
          >
            Esqueci minha senha
          </NButton>
        </VStack>
        <Center px={12} mt={16}>
          <Text color="gray.200" fontSize="sm">
            Ainda não tem acesso?
          </Text>
        </Center>
        <Button
          title="Criar uma conta"
          variant="secondary"
          mt="4"
          mx={12}
          onPress={handleGoToNewAccount}
          isDisabled={isSubmitting}
        />
      </VStack>
    </ScrollView>
  );
}
