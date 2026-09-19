/**
 * @openapi
 * /health:
 *   get:
 *     summary: Estado del servidor (Healthcheck)
 *     tags: [Autenticación]
 *     security: []
 *     responses:
 *       200:
 *         description: Servidor en ejecución
 *
 * /api/auth/login:
 *   post:
 *     summary: Autenticar usuario (Login)
 *     tags: [Autenticación]
 *     security: []
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
 *                 format: email
 *                 example: admin@narubi.com
 *               contrasena:
 *                 type: string
 *                 example: Admin123!
 *     responses:
 *       200:
 *         description: Autenticación exitosa y devolución de tokens JWT
 *
 * /api/auth/me:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado extraídos del token JWT
 *
 * /api/usuarios:
 *   get:
 *     summary: Listar todos los usuarios registrados
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de usuarios
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombreCompleto, correoElectronico, contrasena, rol]
 *             properties:
 *               nombreCompleto:
 *                 type: string
 *                 example: "Carlos Cajero"
 *               correoElectronico:
 *                 type: string
 *                 format: email
 *                 example: "cajero1@narubi.com"
 *               contrasena:
 *                 type: string
 *                 example: "Cajero123!"
 *               rol:
 *                 type: string
 *                 enum: [ADMINISTRADOR, PUNTO_VENTA, BODEGA]
 *                 example: "PUNTO_VENTA"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener información detallada de un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *   put:
 *     summary: Editar usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *   delete:
 *     summary: Eliminar usuario de la base de datos
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado permanentemente
 *
 * /api/usuarios/{id}/estado:
 *   patch:
 *     summary: Cambiar estado del usuario (Activar / Inactivar)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado actualizado
 *
 * /api/categorias:
 *   get:
 *     summary: Listar todas las categorías
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 *   post:
 *     summary: Registrar una nueva categoría
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Bebidas"
 *               descripcion:
 *                 type: string
 *                 example: "Gaseosas, jugos y aguas"
 *     responses:
 *       201:
 *         description: Categoría registrada
 *
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtener categoría por ID
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *   put:
 *     summary: Editar categoría
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *   delete:
 *     summary: Eliminar categoría
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *
 * /api/proveedores:
 *   get:
 *     summary: Listar proveedores registrados
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *   post:
 *     summary: Registrar un nuevo proveedor
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [razonSocial, ruc]
 *             properties:
 *               razonSocial:
 *                 type: string
 *                 example: "Distribuidora Central S.A."
 *               ruc:
 *                 type: string
 *                 example: "1790000000001"
 *               telefono:
 *                 type: string
 *                 example: "0999999999"
 *               email:
 *                 type: string
 *                 example: "ventas@distribuidora.com"
 *               direccion:
 *                 type: string
 *                 example: "Av. Galo Plaza Lasso N45-12"
 *     responses:
 *       201:
 *         description: Proveedor registrado exitosamente
 *
 * /api/productos:
 *   get:
 *     summary: Listar catálogo de productos (con filtros por categoría, proveedor, tipo de venta y estado)
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoriaId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: proveedorId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: tipoVenta
 *         schema:
 *           type: string
 *           enum: [PAQUETE, PESO]
 *       - in: query
 *         name: activo
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Lista de productos obtenida de PostgreSQL
 *   post:
 *     summary: Registrar producto e inicializar su registro en la tabla Stock (0)
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [codigoBarras, nombre, categoriaId, proveedorId, tipoVenta]
 *             properties:
 *               codigoBarras:
 *                 type: string
 *                 example: "786100000001"
 *               nombre:
 *                 type: string
 *                 example: "Arroz Extra 1kg"
 *               descripcion:
 *                 type: string
 *                 example: "Arroz blanco de primera calidad"
 *               categoriaId:
 *                 type: integer
 *                 example: 1
 *               proveedorId:
 *                 type: integer
 *                 example: 1
 *               tipoVenta:
 *                 type: string
 *                 enum: [PAQUETE, PESO]
 *                 example: "PAQUETE"
 *               unidadesPorPaquete:
 *                 type: integer
 *                 example: 12
 *               precioPaquete:
 *                 type: number
 *                 example: 18.5
 *               precioLibra:
 *                 type: number
 *                 example: 0.75
 *               precioMayorista:
 *                 type: number
 *                 example: 16.0
 *               stockMinimo:
 *                 type: number
 *                 example: 10
 *               ivaTarifa:
 *                 type: number
 *                 example: 15.0
 *     responses:
 *       201:
 *         description: Producto registrado exitosamente en PostgreSQL y stock inicializado en 0
 *
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *   put:
 *     summary: Editar producto
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado
 *
 * /api/productos/{id}/estado:
 *   patch:
 *     summary: Activar / Inactivar un producto
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [activo]
 *             properties:
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Estado del producto actualizado
 *
 * /api/stock:
 *   get:
 *     summary: Consultar niveles de stock por bodega (con unidad de medida calculada)
 *     tags: [Stock e Inventario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bodegaId
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Niveles de stock formateados con unidad de medida (paquetes o libras)
 *
 * /api/stock/alertas:
 *   get:
 *     summary: Consultar productos en alerta de stock mínimo
 *     tags: [Stock e Inventario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Productos con cantidad disponible igual o menor al stock mínimo
 *
 * /api/kardex/{productoId}:
 *   get:
 *     summary: Consultar movimientos del Kardex por producto (Cronológico)
 *     tags: [Kardex y Ajustes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial de movimientos de inventario
 *
 * /api/inventario/ajustes:
 *   post:
 *     summary: Registrar un ajuste manual de inventario (+ / -)
 *     tags: [Kardex y Ajustes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productoId, bodegaId, cantidad, motivo]
 *             properties:
 *               productoId:
 *                 type: integer
 *                 example: 1
 *               bodegaId:
 *                 type: integer
 *                 example: 1
 *               cantidad:
 *                 type: number
 *                 example: 15
 *               motivo:
 *                 type: string
 *                 example: "Ajuste inicial por inventario físico rotativo"
 *     responses:
 *       201:
 *         description: Ajuste registrado exitosamente
 *
 * /api/recepciones:
 *   get:
 *     summary: Listar historial de recepción de mercadería (Entradas)
 *     tags: [Recepciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial completo de recepciones de mercadería
 *   post:
 *     summary: Registrar recepción de mercadería de proveedor (Entrada de stock)
 *     tags: [Recepciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [proveedorId, bodegaId, detalles]
 *             properties:
 *               proveedorId:
 *                 type: integer
 *                 example: 1
 *               bodegaId:
 *                 type: integer
 *                 example: 1
 *               numeroDocumento:
 *                 type: string
 *                 example: "FACT-PROV-9012"
 *               detalles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productoId]
 *                   properties:
 *                     productoId:
 *                       type: integer
 *                       example: 1
 *                     cantidadPaquetes:
 *                       type: integer
 *                       example: 50
 *                     costoUnitario:
 *                       type: number
 *                       example: 14.50
 *     responses:
 *       201:
 *         description: Recepción registrada exitosamente, stock incrementado en PostgreSQL y Kardex actualizado
 *
 * /api/ventas:
 *   get:
 *     summary: Listar historial de ventas registradas en el POS
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial completo de ventas POS
 *   post:
 *     summary: Registrar venta en el Punto de Venta POS (Salida de stock y generación de clave SRI de 49 dígitos)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bodegaId, modalidadVenta, detalles]
 *             properties:
 *               clienteId:
 *                 type: integer
 *                 example: 1
 *               bodegaId:
 *                 type: integer
 *                 example: 1
 *               modalidadVenta:
 *                 type: string
 *                 enum: [AL_POR_MENOR, AL_POR_MAYOR]
 *                 example: "AL_POR_MENOR"
 *               detalles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productoId, precioAplicado]
 *                   properties:
 *                     productoId:
 *                       type: integer
 *                       example: 1
 *                     cantidadPaquetes:
 *                       type: integer
 *                       example: 5
 *                     precioAplicado:
 *                       type: number
 *                       example: 18.50
 *     responses:
 *       201:
 *         description: Venta registrada exitosamente, stock decrementado, comprobante SRI de 49 dígitos generado y Kardex actualizado
 *
 * /api/ventas/{id}:
 *   get:
 *     summary: Obtener detalle completo de una venta e información del comprobante SRI por ID
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta y comprobante encontrados
 *
 * /api/ventas/{id}/anular:
 *   patch:
 *     summary: Anular una venta (reinvierte el stock a la bodega e inserta movimiento en Kardex)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta anulada exitosamente y stock devuelto a PostgreSQL
 */
