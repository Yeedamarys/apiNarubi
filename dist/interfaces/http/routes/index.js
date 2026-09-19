"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_routes_1 = __importDefault(require("../docs/swagger.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const usuarios_routes_1 = __importDefault(require("./usuarios.routes"));
const categorias_routes_1 = __importDefault(require("./categorias.routes"));
const proveedores_routes_1 = __importDefault(require("./proveedores.routes"));
const productos_routes_1 = __importDefault(require("./productos.routes"));
const stock_routes_1 = __importDefault(require("./stock.routes"));
const kardex_routes_1 = __importDefault(require("./kardex.routes"));
const inventario_routes_1 = __importDefault(require("./inventario.routes"));
const recepciones_routes_1 = __importDefault(require("./recepciones.routes"));
const ventas_routes_1 = __importDefault(require("./ventas.routes"));
const router = (0, express_1.Router)();
// Endpoint de Healthcheck
router.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'API NARUBI POS & Inventario',
    });
});
// Documentación de la API (Swagger UI)
router.use('/api-docs', swagger_routes_1.default);
// Rutas completas de la API por módulo
router.use('/api/auth', auth_routes_1.default);
router.use('/api/usuarios', usuarios_routes_1.default);
router.use('/api/categorias', categorias_routes_1.default);
router.use('/api/proveedores', proveedores_routes_1.default);
router.use('/api/productos', productos_routes_1.default);
router.use('/api/stock', stock_routes_1.default);
router.use('/api/kardex', kardex_routes_1.default);
router.use('/api/inventario', inventario_routes_1.default);
router.use('/api/recepciones', recepciones_routes_1.default);
router.use('/api/ventas', ventas_routes_1.default);
exports.default = router;
