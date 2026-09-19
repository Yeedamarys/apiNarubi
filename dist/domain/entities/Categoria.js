"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
class Categoria {
    id;
    nombre;
    descripcion;
    constructor(props) {
        this.id = props.id;
        this.nombre = props.nombre;
        this.descripcion = props.descripcion ?? null;
    }
    static crear(props) {
        if (!props.nombre || props.nombre.trim().length === 0) {
            throw new Error('El nombre de la categoría es obligatorio.');
        }
        if (props.nombre.trim().length > 100) {
            throw new Error('El nombre de la categoría no puede exceder los 100 caracteres.');
        }
        if (props.descripcion && props.descripcion.length > 255) {
            throw new Error('La descripción no puede exceder los 255 caracteres.');
        }
        return new Categoria({
            ...props,
            nombre: props.nombre.trim(),
            descripcion: props.descripcion ? props.descripcion.trim() : null,
        });
    }
}
exports.Categoria = Categoria;
