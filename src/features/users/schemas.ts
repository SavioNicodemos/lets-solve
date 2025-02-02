import { z } from 'zod';

export const createUserSchema = z.object({
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

  password: z
    .string({ required_error: 'Informe uma senha' })
    .min(8, 'A senha deve ter pelo menos 6 dígitos.'),

  confirm_password: z
    .string({
      required_error: 'Informe uma confirmação de senha',
    })
    .min(8, 'A senha deve ter pelo menos 6 dígitos.'),
});
