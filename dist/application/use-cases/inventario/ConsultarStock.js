"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultarStock = void 0;
class ConsultarStock {
    stockRepo;
    constructor(stockRepo) {
        this.stockRepo = stockRepo;
    }
    async ejecutar(bodegaId) {
        return await this.stockRepo.listarStockConDetalle(bodegaId);
    }
}
exports.ConsultarStock = ConsultarStock;
