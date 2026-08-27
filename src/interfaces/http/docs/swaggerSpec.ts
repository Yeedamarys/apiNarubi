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
 *         content:
 *           application/json:
 *             example:
 *               status: "ok"
 *               timestamp: "2026-08-26T20:00:00Z"
 *               service: "API NARUBI POS & Inventario"
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
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               usuario:
 *                 id: 1
 *                 nombreCompleto: "Administrador Narubi"
 *                 correoElectronico: "admin@narubi.com"
 *                 rol: "ADMINISTRADOR"
 *       401:
 *         description: Credenciales incorrectas o usuario inactivo
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
 *       401:
 *         description: Token no proporcionado o inválido
 * 
 * /api/usuarios:
 *   get:
 *     summary: Listar todos los usuarios registrados
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de usuarios obtenida exitosamente de PostgreSQL
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nombreCompleto: "Administrador Narubi"
 *                 correoElectronico: "admin@narubi.com"
 *                 rol: "ADMINISTRADOR"
 *                 activo: true
 *                 fechaCreacion: "2026-08-26T20:00:00.000Z"
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Acceso denegado (Requiere rol ADMINISTRADOR)
 * 
 *   post:
 *     summary: Crear un nuevo usuario en la base de datos
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
 *         description: Usuario registrado exitosamente en PostgreSQL
 *       400:
 *         description: Error de validación o correo duplicado
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
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 * 
 *   put:
 *     summary: Editar / Actualizar información de un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCompleto:
 *                 type: string
 *                 example: "Carlos Alberto Cajero"
 *               correoElectronico:
 *                 type: string
 *                 format: email
 *                 example: "carlos.cajero@narubi.com"
 *               contrasena:
 *                 type: string
 *                 example: "NuevaClave123!"
 *               rol:
 *                 type: string
 *                 enum: [ADMINISTRADOR, PUNTO_VENTA, BODEGA]
 *                 example: "PUNTO_VENTA"
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente en PostgreSQL
 *       400:
 *         description: Error de validación o correo duplicado
 *       404:
 *         description: Usuario no encontrado
 * 
 *   delete:
 *     summary: Eliminar usuario de la base de datos (Eliminación física de PostgreSQL)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Usuario eliminado permanentemente de PostgreSQL
 *       404:
 *         description: Usuario no encontrado
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
 *         example: 2
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
 *                 example: false
 *     responses:
 *       200:
 *         description: Estado del usuario actualizado en PostgreSQL
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 */
