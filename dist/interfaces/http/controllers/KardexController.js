"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KardexController = void 0;
const ConsultarKardex_1 = require("../../../application/use-cases/inventario/ConsultarKardex");
const PrismaMovimientoRepository_1 = require("../../../infrastructure/persistence/PrismaMovimientoRepository");
const movimientoRepo = new PrismaMovimientoRepository_1.PrismaMovimientoRepository();
const consultarKardexUseCase = new ConsultarKardex_1.ConsultarKardex(movimientoRepo);
class KardexController {
    async consultarPorProducto(req, res, next) {
        try {
            const productoId = parseInt(req.params.productoId, 10);
            const bodegaIdQuery = req.query.bodegaId
                ? parseInt(req.query.bodegaId, 10)
                : undefined;
            const movimientos = await consultarKardexUseCase.ejecutar(productoId, bodegaIdQuery);
            res.status(200).json(movimientos);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.KardexController = KardexController;
