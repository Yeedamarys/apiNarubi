import { z } from 'zod';

export const editarUsuarioSchema = z.object({
  nombreCompleto: z
    .string()
    .min(3, 'El nombre completo debe tener al menos 3 caracteres.')
    .optional(),
  correoElectronico: z
    .string()
    .email('Formato de correo electrónico inválido.')
    .optional(),
  contrasena: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.')
    .optional(),
  rol: z
    .enum(['ADMINISTRADOR', 'PUNTO_VENTA', 'BODEGA'], {
      invalid_type_error: 'El rol debe ser ADMINISTRADOR, PUNTO_VENTA o BODEGA.',
    })
    .optional(),
  activo: z.boolean().optional(),
});

export type EditarUsuarioDTO = z.infer<typeof editarUsuarioSchema>;
