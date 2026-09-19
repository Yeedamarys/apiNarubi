"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Venta_1 = require("../Venta");
describe('Entidad Venta', () => {
    it('debe crear una instancia válida de Venta', () => {
        const venta = Venta_1.Venta.crear({
            numeroSecuencial: '001-001-000000001',
            usuarioId: 1,
            bodegaId: 1,
            modalidadVenta: 'AL_POR_MENOR',
            subtotal: 100.0,
            iva: 15.0,
            total: 115.0,
            detalles: [
                {
                    productoId: 1,
                    cantidadPaquetes: 2,
                    precioAplicado: 50.0,
                },
            ],
        });
        expect(venta).toBeDefined();
        expect(venta.numeroSecuencial).toBe('001-001-000000001');
        expect(venta.subtotal).toBe(100.0);
        expect(venta.total).toBe(115.0);
        expect(venta.detalles).toHaveLength(1);
    });
    it('debe lanzar error si no tiene detalles de producto', () => {
        expect(() => {
            Venta_1.Venta.crear({
                numeroSecuencial: '001-001-000000002',
                usuarioId: 1,
                bodegaId: 1,
                modalidadVenta: 'AL_POR_MENOR',
                subtotal: 0,
                iva: 0,
                total: 0,
                detalles: [],
            });
        }).toThrow('La venta debe contener al menos un detalle de producto.');
    });
    it('debe generar una Clave de Acceso SRI de 49 dígitos válida', () => {
        const clave = Venta_1.Venta.generarClaveAccesoSRI(1, new Date('2026-09-18T10:00:00Z'));
        expect(clave).toHaveLength(49);
        expect(/^\d{49}$/.test(clave)).toBe(true);
    });
});
