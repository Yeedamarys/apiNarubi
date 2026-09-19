"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProveedorRepository = void 0;
const Proveedor_1 = require("../../domain/entities/Proveedor");
const prismaClient_1 = require("./prismaClient");
class PrismaProveedorRepository {
    async buscarPorId(id) {
        const raw = await prismaClient_1.prisma.proveedor.findUnique({
            where: { id },
        });
        if (!raw)
            return null;
        return Proveedor_1.Proveedor.crear({
            id: raw.id,
            razonSocial: raw.razon_social,
            ruc: raw.ruc,
            telefono: raw.telefono,
            email: raw.email,
            direccion: raw.direccion,
        });
    }
    async buscarPorRuc(ruc) {
        const raw = await prismaClient_1.prisma.proveedor.findUnique({
            where: { ruc },
        });
        if (!raw)
            return null;
        return Proveedor_1.Proveedor.crear({
            id: raw.id,
            razonSocial: raw.razon_social,
            ruc: raw.ruc,
            telefono: raw.telefono,
            email: raw.email,
            direccion: raw.direccion,
        });
    }
    async guardar(proveedor) {
        const raw = await prismaClient_1.prisma.proveedor.create({
            data: {
                razon_social: proveedor.razonSocial,
                ruc: proveedor.ruc,
                telefono: proveedor.telefono,
                email: proveedor.email,
                direccion: proveedor.direccion,
            },
        });
        return Proveedor_1.Proveedor.crear({
            id: raw.id,
            razonSocial: raw.razon_social,
            ruc: raw.ruc,
            telefono: raw.telefono,
            email: raw.email,
            direccion: raw.direccion,
        });
    }
    async listar() {
        const raws = await prismaClient_1.prisma.proveedor.findMany({
            orderBy: { id: 'asc' },
        });
        return raws.map((raw) => Proveedor_1.Proveedor.crear({
            id: raw.id,
            razonSocial: raw.razon_social,
            ruc: raw.ruc,
            telefono: raw.telefono,
            email: raw.email,
            direccion: raw.direccion,
        }));
    }
    async actualizar(id, datos) {
        const raw = await prismaClient_1.prisma.proveedor.update({
            where: { id },
            data: {
                ...(datos.razonSocial && { razon_social: datos.razonSocial }),
                ...(datos.ruc && { ruc: datos.ruc }),
                ...(datos.telefono !== undefined && { telefono: datos.telefono }),
                ...(datos.email !== undefined && { email: datos.email }),
                ...(datos.direccion !== undefined && { direccion: datos.direccion }),
            },
        });
        return Proveedor_1.Proveedor.crear({
            id: raw.id,
            razonSocial: raw.razon_social,
            ruc: raw.ruc,
            telefono: raw.telefono,
            email: raw.email,
            direccion: raw.direccion,
        });
    }
}
exports.PrismaProveedorRepository = PrismaProveedorRepository;
