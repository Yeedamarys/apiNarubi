"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API NARUBI — Sistema POS, Inventario y Facturación Electrónica',
            version: '1.0.0',
            description: 'Documentación oficial de los endpoints de la API de NARUBI construida con Clean Architecture y Express.',
            contact: {
                name: 'Soporte Técnico API NARUBI',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local de Desarrollo',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Ingrese el Token Access JWT obtenido en el login.',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: [
            { name: 'Autenticación', description: 'Endpoints para inicio de sesión y gestión de tokens' },
            { name: 'Usuarios', description: 'Gestión de usuarios y asignación de roles' },
            { name: 'Catálogo', description: 'Gestión de productos, categorías y proveedores' },
            {
                name: 'Stock e Inventario',
                description: 'Consultas de stock y alertas de inventario mínimo',
            },
            { name: 'Kardex y Ajustes', description: 'Movimientos de inventario y ajustes manuales' },
            {
                name: 'Recepciones',
                description: 'Registro y consulta de recepción de mercadería (Entradas)',
            },
            {
                name: 'Ventas',
                description: 'Punto de venta y emisión de comprobantes electrónicos (Salidas)',
            },
        ],
    },
    apis: [
        path_1.default.join(__dirname, '../../routes/*.ts'),
        path_1.default.join(__dirname, '../../routes/*.js'),
        path_1.default.join(__dirname, './swaggerSpec.ts'),
        path_1.default.join(__dirname, './swaggerSpec.js'),
        './src/interfaces/http/routes/*.ts',
        './src/interfaces/http/docs/swaggerSpec.ts',
    ],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
