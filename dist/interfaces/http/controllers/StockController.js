"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const ConsultarStock_1 = require("../../../application/use-cases/inventario/ConsultarStock");
const ConsultarAlertasStock_1 = require("../../../application/use-cases/inventario/ConsultarAlertasStock");
const PrismaStockRepository_1 = require("../../../infrastructure/persistence/PrismaStockRepository");
const stockRepo = new PrismaStockRepository_1.PrismaStockRepository();
const consultarStockUseCase = new ConsultarStock_1.ConsultarStock(stockRepo);
const consultarAlertasStockUseCase = new ConsultarAlertasStock_1.ConsultarAlertasStock(stockRepo);
class StockController {
    async listar(req, res, next) {
        try {
            const bodegaIdQuery = req.query.bodegaId
                ? parseInt(req.query.bodegaId, 10)
                : undefined;
            const stock = await consultarStockUseCase.ejecutar(bodegaIdQuery);
            res.status(200).json(stock);
        }
        catch (error) {
            next(error);
        }
    }
    async listarAlertas(_req, res, next) {
        try {
            const alertas = await consultarAlertasStockUseCase.ejecutar();
            res.status(200).json(alertas);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StockController = StockController;
