import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API NARUBI — Sistema POS, Inventario y Facturación Electrónica',
      version: '1.0.0',
      description:
        'Documentación oficial de los endpoints de la API de NARUBI construida con Clean Architecture y Express.',
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
      { name: 'Stock e Inventario', description: 'Consultas de stock y alertas de inventario mínimo' },
      { name: 'Recepciones', description: 'Registro y consulta de recepción de mercadería (Entradas)' },
      { name: 'Ventas', description: 'Punto de venta y emisión de comprobantes electrónicos (Salidas)' },
      { name: 'Kardex y Ajustes', description: 'Movimientos de inventario y ajustes manuales' },
    ],
  },
  apis: ['./src/interfaces/http/routes/*.ts', './src/interfaces/http/docs/swaggerSpec.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
