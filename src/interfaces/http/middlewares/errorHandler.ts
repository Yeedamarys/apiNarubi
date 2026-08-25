import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly codigo: string;

  constructor(mensaje: string, statusCode: number = 400, codigo: string = 'BAD_REQUEST') {
    super(mensaje);
    this.statusCode = statusCode;
    this.codigo = codigo;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        codigo: err.codigo,
        mensaje: err.message,
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
