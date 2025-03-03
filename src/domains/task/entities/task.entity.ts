export class TaskEntity {
  constructor(
    public id: number,
    public titulo: string,
    public description: string,
    public fechaVencimiento: Date,
    public estado: 'pendiente' | 'completada',
    public usuarioId: number
  ) {}

  public static fromObject(object: { [key: string]: any }): TaskEntity {
    const {  id , titulo, description, fechaVencimiento, estado, usuarioId } = object;

    if (!titulo || typeof titulo !== 'string') {
      throw new Error('Invalid object properties: titulo');
    }

    if (!description || typeof description !== 'string') {
      throw new Error('Invalid object properties: description');
    }

    if (!fechaVencimiento || isNaN(Date.parse(fechaVencimiento))) {
      throw new Error('Invalid object properties: fechaVencimiento');
    }

    if (!estado || !['pendiente', 'en-progreso', 'completada'].includes(estado)) {
      throw new Error('Invalid object properties: estado');
    }

    if (!usuarioId || typeof usuarioId !== 'number') {
      throw new Error('Invalid object properties: usuarioId');
    }

    return new TaskEntity(id, titulo, description, new Date(fechaVencimiento), estado, usuarioId);
  }
}
