import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Senha deve conter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'A senha deve conter pelo menos 1 letra maiúscula')
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    'A senha deve conter pelo menos 1 caractere especial',
  );
