/**
 * @openapi
 * /health:
 *   get:
 *     summary: Estado del servidor (Healthcheck)
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Servidor en ejecución
 *         content:
 *           application/json:
 *             example:
 *               status: "ok"
 *               timestamp: "2026-08-24T20:46:39Z"
 * 
 * /api/auth/login:
 *   post:
 *     summary: Autenticar usuario (Login)
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [correoElectronico, contrasena]
 *             properties:
 *               correoElectronico:
 *                 type: string
 *                 example: admin@narubi.com
 *               contrasena:
 *                 type: string
 *                 example: Admin123!
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       401:
 *         description: Credenciales incorrectas
 * 
 * /api/usuarios:
 *   get:
 *     summary: Listar usuarios (ADMINISTRADOR)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios registrados
 *       403:
 *         description: Acceso denegado (Rol insuficiente)
 * 
 * /api/productos:
 *   get:
 *     summary: Listar catálogo de productos
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Productos obtenidos correctamente
 * 
 * /api/stock:
 *   get:
 *     summary: Consultar niveles de stock por bodega
 *     tags: [Stock e Inventario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Niveles de stock
 * 
 * /api/recepciones:
 *   post:
 *     summary: Registrar recepción de mercadería (Entrada de inventario)
 *     tags: [Recepciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Recepción registrada exitosamente
 * 
 * /api/ventas:
 *   post:
 *     summary: Registrar venta y emitir comprobante electrónico (Salida)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Venta registrada y comprobante emitido
 * 
 * /api/kardex/{productoId}:
 *   get:
 *     summary: Consultar movimientos de Kardex por producto
 *     tags: [Kardex y Ajustes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Historial de movimientos obtenido
 */
