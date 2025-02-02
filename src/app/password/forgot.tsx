import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Center, Heading, ScrollView, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/assets/Logo.svg';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useToast } from '@/features/shared/hooks/useToast';
import { requestPasswordReset } from '@/features/auth/api';

export default function ForgotPassword() {
  const toast = useToast();
  const {
    control,
    formState: { isSubmitting, isLoading, errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(z.object({ email: z.string().email() })),
  });

  const handleRequestPassword = async (data: { email: string }) => {
    const { email } = data;

    await requestPasswordReset({ email }).catch(() => {
      // Not handled on purpose to user not identify if email exists or not on the system
    });

    toast.success(
      'Voce receberá um email com instruções para redefinir a senha.',
    );

    router.replace('/sign-in');
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
            <Heading fontSize={24} color="gray.100">
              Recuperar senha
            </Heading>
            <Text color="gray.300" fontSize="sm" textAlign="center">
              Por favor insira o seu email. Você receberá um link para redefinir
              a sua senha.
            </Text>
          </Center>

          <Center py={12}>
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
                  mx={8}
                />
              )}
            />
          </Center>
          <Button
            title="Próximo"
            variant="blue"
            mb="16"
            mt="4"
            mx={12}
            onPress={handleSubmit(handleRequestPassword)}
            isDisabled={isSubmitting || isLoading}
            isLoading={isSubmitting || isLoading}
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
