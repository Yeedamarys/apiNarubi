"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const zod_1 = require("zod");
class AppError extends Error {
    statusCode;
    codigo;
    constructor(mensaje, statusCode = 400, codigo = 'BAD_REQUEST') {
        super(mensaje);
        this.statusCode = statusCode;
        this.codigo = codigo;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: {
                codigo: err.codigo,
                mensaje: err.message,
            },
        });
        return;
    }
    if (err instanceof zod_1.ZodError) {
        const primerDetalle = err.errors[0]?.message || 'Error de validación en los datos ingresados.';
        res.status(400).json({
            error: {
                codigo: 'VALIDATION_ERROR',
                mensaje: primerDetalle,
                detalles: err.errors.map((e) => ({
                    campo: e.path.join('.'),
                    mensaje: e.message,
                })),
            },
        });
        return;
    }
    // Manejo de errores no capturados / 500
    console.error('[UNHANDLED_ERROR]', err);
    res.status(500).json({
        error: {
            codigo: 'INTERNAL_SERVER_ERROR',
            mensaje: 'Ha ocurrido un error interno en el servidor.',
        },
    });
};
exports.errorHandler = errorHandler;
