"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultarAlertasStock = void 0;
class ConsultarAlertasStock {
    stockRepo;
    constructor(stockRepo) {
        this.stockRepo = stockRepo;
    }
    async ejecutar() {
        return await this.stockRepo.listarAlertas();
    }
}
exports.ConsultarAlertasStock = ConsultarAlertasStock;
