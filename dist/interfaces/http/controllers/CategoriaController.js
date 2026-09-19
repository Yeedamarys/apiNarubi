"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaController = void 0;
const CrearCategoria_1 = require("../../../application/use-cases/catalogo/CrearCategoria");
const ListarCategorias_1 = require("../../../application/use-cases/catalogo/ListarCategorias");
const ObtenerCategoriaPorId_1 = require("../../../application/use-cases/catalogo/ObtenerCategoriaPorId");
const EditarCategoria_1 = require("../../../application/use-cases/catalogo/EditarCategoria");
const EliminarCategoria_1 = require("../../../application/use-cases/catalogo/EliminarCategoria");
const PrismaCategoriaRepository_1 = require("../../../infrastructure/persistence/PrismaCategoriaRepository");
const crearCategoria_dto_1 = require("../dtos/crearCategoria.dto");
const editarCategoria_dto_1 = require("../dtos/editarCategoria.dto");
const categoriaRepo = new PrismaCategoriaRepository_1.PrismaCategoriaRepository();
const crearCategoriaUseCase = new CrearCategoria_1.CrearCategoria(categoriaRepo);
const listarCategoriasUseCase = new ListarCategorias_1.ListarCategorias(categoriaRepo);
const obtenerCategoriaPorIdUseCase = new ObtenerCategoriaPorId_1.ObtenerCategoriaPorId(categoriaRepo);
const editarCategoriaUseCase = new EditarCategoria_1.EditarCategoria(categoriaRepo);
const eliminarCategoriaUseCase = new EliminarCategoria_1.EliminarCategoria(categoriaRepo);
class CategoriaController {
    async crear(req, res, next) {
        try {
            const validBody = crearCategoria_dto_1.crearCategoriaSchema.parse(req.body);
            const nuevaCategoria = await crearCategoriaUseCase.ejecutar(validBody);
            res.status(201).json({
                mensaje: 'Categoría registrada exitosamente.',
                categoria: {
                    id: nuevaCategoria.id,
                    nombre: nuevaCategoria.nombre,
                    descripcion: nuevaCategoria.descripcion,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async listar(_req, res, next) {
        try {
            const categorias = await listarCategoriasUseCase.ejecutar();
            const resultado = categorias.map((c) => ({
                id: c.id,
                nombre: c.nombre,
                descripcion: c.descripcion,
            }));
            res.status(200).json(resultado);
        }
        catch (error) {
            next(error);
        }
    }
    async obtenerPorId(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const categoria = await obtenerCategoriaPorIdUseCase.ejecutar(id);
            res.status(200).json({
                id: categoria.id,
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async editar(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const validBody = editarCategoria_dto_1.editarCategoriaSchema.parse(req.body);
            const categoriaEditada = await editarCategoriaUseCase.ejecutar(id, validBody);
            res.status(200).json({
                mensaje: 'Categoría actualizada exitosamente.',
                categoria: {
                    id: categoriaEditada.id,
                    nombre: categoriaEditada.nombre,
                    descripcion: categoriaEditada.descripcion,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async eliminar(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            await eliminarCategoriaUseCase.ejecutar(id);
            res.status(200).json({
                mensaje: `Categoría con ID ${id} eliminada exitosamente de la base de datos.`,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CategoriaController = CategoriaController;
