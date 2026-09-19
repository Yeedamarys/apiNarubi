"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsuarioRepository = void 0;
const Usuario_1 = require("../../domain/entities/Usuario");
const prismaClient_1 = require("./prismaClient");
class PrismaUsuarioRepository {
    async buscarPorCorreo(correoElectronico) {
        const raw = await prismaClient_1.prisma.usuario.findUnique({
            where: { correo_electronico: correoElectronico },
        });
        if (!raw)
            return null;
        return Usuario_1.Usuario.crear({
            id: raw.id,
            nombreCompleto: raw.nombre_completo,
            correoElectronico: raw.correo_electronico,
            passwordHash: raw.password_hash,
            rol: raw.rol,
            activo: raw.activo,
            fechaCreacion: raw.fecha_creacion,
        });
    }
    async buscarPorId(id) {
        const raw = await prismaClient_1.prisma.usuario.findUnique({
            where: { id },
        });
        if (!raw)
            return null;
        return Usuario_1.Usuario.crear({
            id: raw.id,
            nombreCompleto: raw.nombre_completo,
            correoElectronico: raw.correo_electronico,
            passwordHash: raw.password_hash,
            rol: raw.rol,
            activo: raw.activo,
            fechaCreacion: raw.fecha_creacion,
        });
    }
    async guardar(usuario) {
        const raw = await prismaClient_1.prisma.usuario.create({
            data: {
                nombre_completo: usuario.nombreCompleto,
                correo_electronico: usuario.correoElectronico,
                password_hash: usuario.passwordHash,
                rol: usuario.rol,
                activo: usuario.activo,
            },
        });
        return Usuario_1.Usuario.crear({
            id: raw.id,
            nombreCompleto: raw.nombre_completo,
            correoElectronico: raw.correo_electronico,
            passwordHash: raw.password_hash,
            rol: raw.rol,
            activo: raw.activo,
            fechaCreacion: raw.fecha_creacion,
        });
    }
    async listar() {
        const raws = await prismaClient_1.prisma.usuario.findMany({
            orderBy: { id: 'asc' },
        });
        return raws.map((raw) => Usuario_1.Usuario.crear({
            id: raw.id,
            nombreCompleto: raw.nombre_completo,
            correoElectronico: raw.correo_electronico,
            passwordHash: raw.password_hash,
            rol: raw.rol,
            activo: raw.activo,
            fechaCreacion: raw.fecha_creacion,
        }));
    }
    async actualizar(id, datos) {
        const raw = await prismaClient_1.prisma.usuario.update({
            where: { id },
            data: {
                ...(datos.nombreCompleto && { nombre_completo: datos.nombreCompleto }),
                ...(datos.correoElectronico && { correo_electronico: datos.correoElectronico }),
                ...(datos.passwordHash && { password_hash: datos.passwordHash }),
                ...(datos.rol && { rol: datos.rol }),
                ...(datos.activo !== undefined && { activo: datos.activo }),
            },
        });
        return Usuario_1.Usuario.crear({
            id: raw.id,
            nombreCompleto: raw.nombre_completo,
            correoElectronico: raw.correo_electronico,
            passwordHash: raw.password_hash,
            rol: raw.rol,
            activo: raw.activo,
            fechaCreacion: raw.fecha_creacion,
        });
    }
    async desactivar(id) {
        await prismaClient_1.prisma.usuario.update({
            where: { id },
            data: { activo: false },
        });
    }
    async eliminar(id) {
        try {
            // Intenta eliminación física de la fila en PostgreSQL
            await prismaClient_1.prisma.usuario.delete({
                where: { id },
            });
        }
        catch {
            // Si el usuario ya tiene registros asociados (ventas, recepciones, kardex), realiza desactivación lógica
            await this.desactivar(id);
        }
    }
}
exports.PrismaUsuarioRepository = PrismaUsuarioRepository;
