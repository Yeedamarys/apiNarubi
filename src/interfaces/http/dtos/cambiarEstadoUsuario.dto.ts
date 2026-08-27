import { z } from 'zod';

export const cambiarEstadoUsuarioSchema = z.object({
  activo: z.boolean({
    required_error: 'El estado activo es requerido (true o false).',
    invalid_type_error: 'El estado activo debe ser un valor booleano (true o false).',
  }),
});

export type CambiarEstadoUsuarioDTO = z.infer<typeof cambiarEstadoUsuarioSchema>;
