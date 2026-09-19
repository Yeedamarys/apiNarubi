"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCategoriaRepository = void 0;
const Categoria_1 = require("../../domain/entities/Categoria");
const prismaClient_1 = require("./prismaClient");
const errorHandler_1 = require("../../interfaces/http/middlewares/errorHandler");
class PrismaCategoriaRepository {
    async buscarPorId(id) {
        const raw = await prismaClient_1.prisma.categoria.findUnique({
            where: { id },
        });
        if (!raw)
            return null;
        return Categoria_1.Categoria.crear({
            id: raw.id,
            nombre: raw.nombre,
            descripcion: raw.descripcion,
        });
    }
    async buscarPorNombre(nombre) {
        const raws = await prismaClient_1.prisma.categoria.findMany({
            where: {
                nombre: {
                    equals: nombre,
                    mode: 'insensitive',
                },
            },
        });
        if (raws.length === 0)
            return null;
        const raw = raws[0];
        return Categoria_1.Categoria.crear({
            id: raw.id,
            nombre: raw.nombre,
            descripcion: raw.descripcion,
        });
    }
    async guardar(categoria) {
        const raw = await prismaClient_1.prisma.categoria.create({
            data: {
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
            },
        });
        return Categoria_1.Categoria.crear({
            id: raw.id,
            nombre: raw.nombre,
            descripcion: raw.descripcion,
        });
    }
    async listar() {
        const raws = await prismaClient_1.prisma.categoria.findMany({
            orderBy: { id: 'asc' },
        });
        return raws.map((raw) => Categoria_1.Categoria.crear({
            id: raw.id,
            nombre: raw.nombre,
            descripcion: raw.descripcion,
        }));
    }
    async actualizar(id, datos) {
        const raw = await prismaClient_1.prisma.categoria.update({
            where: { id },
            data: {
                ...(datos.nombre && { nombre: datos.nombre }),
                ...(datos.descripcion !== undefined && { descripcion: datos.descripcion }),
            },
        });
        return Categoria_1.Categoria.crear({
            id: raw.id,
            nombre: raw.nombre,
            descripcion: raw.descripcion,
        });
    }
    async eliminar(id) {
        try {
            await prismaClient_1.prisma.categoria.delete({
                where: { id },
            });
        }
        catch {
            throw new errorHandler_1.AppError(`No se puede eliminar la categoría con ID ${id} porque tiene productos asociados en el sistema.`, 400, 'FOREIGN_KEY_CONSTRAINT');
        }
    }
}
exports.PrismaCategoriaRepository = PrismaCategoriaRepository;
