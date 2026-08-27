export type RolUsuario = 'ADMINISTRADOR' | 'PUNTO_VENTA' | 'BODEGA';

export const ROLES_PERMITIDOS: RolUsuario[] = ['ADMINISTRADOR', 'PUNTO_VENTA', 'BODEGA'];

export function esRolValido(rol: string): rol is RolUsuario {
  return ROLES_PERMITIDOS.includes(rol as RolUsuario);
}
