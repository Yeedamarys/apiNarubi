import { z } from 'zod';

export const crearUsuarioSchema = z.object({
  nombreCompleto: z
    .string({ required_error: 'El nombre completo es requerido.' })
    .min(3, 'El nombre completo debe tener al menos 3 caracteres.'),
  correoElectronico: z
    .string({ required_error: 'El correo electrónico es requerido.' })
    .email('Formato de correo electrónico inválido.'),
  contrasena: z
    .string({ required_error: 'La contraseña es requerida.' })
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  rol: z.enum(['ADMINISTRADOR', 'PUNTO_VENTA', 'BODEGA'], {
    required_error: 'El rol es requerido.',
    invalid_type_error: 'El rol debe ser ADMINISTRADOR, PUNTO_VENTA o BODEGA.',
  }),
});

export type CrearUsuarioDTO = z.infer<typeof crearUsuarioSchema>;
