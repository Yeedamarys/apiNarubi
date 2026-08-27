import { z } from 'zod';

export const loginSchema = z.object({
  correoElectronico: z
    .string({ required_error: 'El correo electrónico es requerido.' })
    .email('Formato de correo electrónico inválido.'),
  contrasena: z
    .string({ required_error: 'La contraseña es requerida.' })
    .min(1, 'La contraseña no puede estar vacía.'),
});

export type LoginDTO = z.infer<typeof loginSchema>;
