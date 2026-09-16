export interface PropsCategoria {
  id?: number;
  nombre: string;
  descripcion?: string | null;
}

export class Categoria {
  public readonly id?: number;
  public readonly nombre: string;
  public readonly descripcion?: string | null;

  private constructor(props: PropsCategoria) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion ?? null;
  }

  public static crear(props: PropsCategoria): Categoria {
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
