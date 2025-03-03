import { TaskEntity } from "src/domains/task/entities/task.entity";

export class UsuarioEntity {

    constructor(
        public id: number,
        public email: string,
        public password: string,
        public tasks: TaskEntity[], 
        public token?: string, 
    ) { }

    public static fromObject(object: { [key: string]: any }): UsuarioEntity {
        const { id, email, password, tasks, token } = object;

        // Validaciones
        if (!id || typeof id !== 'number') {
            throw new Error('Invalid object properties: id');
        }

        if (!email || typeof email !== 'string') {
            throw new Error('Invalid object properties: email');
        }

        if (!password || typeof password !== 'string') {
            throw new Error('Invalid object properties: password');
        }

        if (tasks && !Array.isArray(tasks)) {
            throw new Error('Invalid object properties: tasks must be an array');
        }

        if (token && typeof token !== 'string') {
            throw new Error('Invalid object properties: token must be a string');
        }

        return new UsuarioEntity(id, email, password, tasks || [], token);
    }
}