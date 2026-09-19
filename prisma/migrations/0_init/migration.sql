-- CreateEnum
CREATE TYPE "estado_comprobante_enum" AS ENUM ('PENDIENTE', 'AUTORIZADO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "estado_venta_enum" AS ENUM ('REGISTRADA', 'ANULADA');

-- CreateEnum
CREATE TYPE "modalidad_venta_enum" AS ENUM ('AL_POR_MENOR', 'AL_POR_MAYOR');

-- CreateEnum
CREATE TYPE "referencia_movimiento_enum" AS ENUM ('VENTA', 'RECEPCION', 'AJUSTE_MANUAL');

-- CreateEnum
CREATE TYPE "rol_usuario" AS ENUM ('ADMINISTRADOR', 'PUNTO_VENTA', 'BODEGA');

-- CreateEnum
CREATE TYPE "tipo_identificacion_enum" AS ENUM ('CEDULA', 'RUC', 'PASAPORTE', 'CONSUMIDOR_FINAL');

-- CreateEnum
CREATE TYPE "tipo_movimiento_enum" AS ENUM ('ENTRADA', 'SALIDA', 'AJUSTE');

-- CreateEnum
CREATE TYPE "tipo_venta_enum" AS ENUM ('PAQUETE', 'PESO');

-- CreateTable
CREATE TABLE "bodega" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,

    CONSTRAINT "bodega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(255),

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "tipo_identificacion" "tipo_identificacion_enum" NOT NULL,
    "identificacion" VARCHAR(20),
    "razon_social" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150),
    "direccion" VARCHAR(255),

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comprobante_electronico" (
    "id" SERIAL NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "clave_acceso" VARCHAR(49) NOT NULL,
    "numero_autorizacion" VARCHAR(100),
    "estado" "estado_comprobante_enum" NOT NULL DEFAULT 'PENDIENTE',
    "fecha_autorizacion" TIMESTAMP(6),
    "xml_firmado_url" VARCHAR(500),
    "ride_pdf_url" VARCHAR(500),

    CONSTRAINT "comprobante_electronico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_recepcion" (
    "id" SERIAL NOT NULL,
    "recepcion_id" INTEGER NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "cantidad_paquetes" INTEGER,
    "peso_libras" DECIMAL(10,3),
    "costo_unitario" DECIMAL(10,2),

    CONSTRAINT "detalle_recepcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_venta" (
    "id" SERIAL NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "cantidad_paquetes" INTEGER,
    "peso_libras" DECIMAL(10,3),
    "precio_aplicado" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "detalle_venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimiento_inventario" (
    "id" SERIAL NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "bodega_id" INTEGER NOT NULL,
    "tipo_movimiento" "tipo_movimiento_enum" NOT NULL,
    "cantidad" DECIMAL(10,3) NOT NULL,
    "referencia_id" INTEGER,
    "referencia_tipo" "referencia_movimiento_enum" NOT NULL,
    "motivo" VARCHAR(255),
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "movimiento_inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto" (
    "id" SERIAL NOT NULL,
    "codigo_barras" VARCHAR(100) NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "descripcion" VARCHAR(255),
    "categoria_id" INTEGER NOT NULL,
    "proveedor_id" INTEGER NOT NULL,
    "tipo_venta" "tipo_venta_enum" NOT NULL,
    "unidades_por_paquete" INTEGER,
    "precio_paquete" DECIMAL(10,2),
    "precio_libra" DECIMAL(10,2),
    "precio_mayorista" DECIMAL(10,2),
    "stock_minimo" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "iva_tarifa" DECIMAL(5,2) NOT NULL DEFAULT 15.00,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proveedor" (
    "id" SERIAL NOT NULL,
    "razon_social" VARCHAR(150) NOT NULL,
    "ruc" VARCHAR(13) NOT NULL,
    "telefono" VARCHAR(30),
    "email" VARCHAR(150),
    "direccion" VARCHAR(255),

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recepcion_mercaderia" (
    "id" SERIAL NOT NULL,
    "proveedor_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "bodega_id" INTEGER NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero_documento" VARCHAR(100),

    CONSTRAINT "recepcion_mercaderia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" SERIAL NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "bodega_id" INTEGER NOT NULL,
    "cantidad_disponible" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "actualizado_en" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre_completo" VARCHAR(150) NOT NULL,
    "correo_electronico" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "rol" "rol_usuario" NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venta" (
    "id" SERIAL NOT NULL,
    "numero_secuencial" VARCHAR(50) NOT NULL,
    "cliente_id" INTEGER,
    "usuario_id" INTEGER NOT NULL,
    "bodega_id" INTEGER NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modalidad_venta" "modalidad_venta_enum" NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,
    "iva" DECIMAL(12,2) NOT NULL,
    "total" DECIMAL(12,2) NOT NULL,
    "estado" "estado_venta_enum" NOT NULL DEFAULT 'REGISTRADA',

    CONSTRAINT "venta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_comprobante_venta" ON "comprobante_electronico"("venta_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_comprobante_clave_acceso" ON "comprobante_electronico"("clave_acceso");

-- CreateIndex
CREATE INDEX "idx_detrecepcion_producto" ON "detalle_recepcion"("producto_id");

-- CreateIndex
CREATE INDEX "idx_detrecepcion_recepcion" ON "detalle_recepcion"("recepcion_id");

-- CreateIndex
CREATE INDEX "idx_detventa_producto" ON "detalle_venta"("producto_id");

-- CreateIndex
CREATE INDEX "idx_detventa_venta" ON "detalle_venta"("venta_id");

-- CreateIndex
CREATE INDEX "idx_movimiento_bodega" ON "movimiento_inventario"("bodega_id");

-- CreateIndex
CREATE INDEX "idx_movimiento_producto" ON "movimiento_inventario"("producto_id", "fecha");

-- CreateIndex
CREATE INDEX "idx_movimiento_usuario" ON "movimiento_inventario"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_producto_codigo_barras" ON "producto"("codigo_barras");

-- CreateIndex
CREATE INDEX "idx_producto_categoria" ON "producto"("categoria_id");

-- CreateIndex
CREATE INDEX "idx_producto_proveedor" ON "producto"("proveedor_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_proveedor_ruc" ON "proveedor"("ruc");

-- CreateIndex
CREATE INDEX "idx_recepcion_bodega" ON "recepcion_mercaderia"("bodega_id");

-- CreateIndex
CREATE INDEX "idx_recepcion_proveedor" ON "recepcion_mercaderia"("proveedor_id");

-- CreateIndex
CREATE INDEX "idx_recepcion_usuario" ON "recepcion_mercaderia"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_stock_bodega" ON "stock"("bodega_id");

-- CreateIndex
CREATE INDEX "idx_stock_producto" ON "stock"("producto_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_stock_producto_bodega" ON "stock"("producto_id", "bodega_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_usuario_correo" ON "usuario"("correo_electronico");

-- CreateIndex
CREATE UNIQUE INDEX "uq_venta_numero_secuencial" ON "venta"("numero_secuencial");

-- CreateIndex
CREATE INDEX "idx_venta_bodega" ON "venta"("bodega_id");

-- CreateIndex
CREATE INDEX "idx_venta_cliente" ON "venta"("cliente_id");

-- CreateIndex
CREATE INDEX "idx_venta_fecha" ON "venta"("fecha");

-- CreateIndex
CREATE INDEX "idx_venta_usuario" ON "venta"("usuario_id");

-- AddForeignKey
ALTER TABLE "comprobante_electronico" ADD CONSTRAINT "fk_comprobante_venta" FOREIGN KEY ("venta_id") REFERENCES "venta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_recepcion" ADD CONSTRAINT "fk_detrecepcion_producto" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_recepcion" ADD CONSTRAINT "fk_detrecepcion_recepcion" FOREIGN KEY ("recepcion_id") REFERENCES "recepcion_mercaderia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "fk_detventa_producto" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "fk_detventa_venta" FOREIGN KEY ("venta_id") REFERENCES "venta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimiento_inventario" ADD CONSTRAINT "fk_movimiento_bodega" FOREIGN KEY ("bodega_id") REFERENCES "bodega"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimiento_inventario" ADD CONSTRAINT "fk_movimiento_producto" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimiento_inventario" ADD CONSTRAINT "fk_movimiento_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "fk_producto_categoria" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "fk_producto_proveedor" FOREIGN KEY ("proveedor_id") REFERENCES "proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recepcion_mercaderia" ADD CONSTRAINT "fk_recepcion_bodega" FOREIGN KEY ("bodega_id") REFERENCES "bodega"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recepcion_mercaderia" ADD CONSTRAINT "fk_recepcion_proveedor" FOREIGN KEY ("proveedor_id") REFERENCES "proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recepcion_mercaderia" ADD CONSTRAINT "fk_recepcion_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "fk_stock_bodega" FOREIGN KEY ("bodega_id") REFERENCES "bodega"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "fk_stock_producto" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "fk_venta_bodega" FOREIGN KEY ("bodega_id") REFERENCES "bodega"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "fk_venta_cliente" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "fk_venta_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

