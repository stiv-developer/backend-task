import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';

describe('Task API (e2e)', () => {
  let app: INestApplication;
  let createdTaskId: number;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // it('/tasks (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/tasks')
  //     .expect(200) // Espera un código de estado 200
  //     .expect((res) => {
  //       // Valida la respuesta
  //       expect(res.body).toBeInstanceOf(Array); // Espera que la respuesta sea un array
  //     });
  // });

  // Obtener todas las tareas
  it('GET /tasks should return an array of tasks', async () => {
    const response = await request(app.getHttpServer()).get('/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Obtener todas las tareas por ID de usuario
  it('GET /tasks/user/:id should return an array of tasks for a user', async () => {
    const response = await request(app.getHttpServer()).get('/tasks/user/1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Crear una tarea
  it('POST /tasks should create a new task', async () => {
    const taskData = { title: 'Nueva tarea', description: 'Descripción',estado:'pendiente',fechaVencimiento:'2025-02-28T00:00:00.000Z', usuarioId: 1 };
    
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(taskData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdTaskId = response.body.id;
  });

  // Obtener tarea por ID
  it('GET /tasks/:id should return a task', async () => {
    const response = await request(app.getHttpServer()).get(`/tasks/${createdTaskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdTaskId);
  });

  // Actualizar una tarea
  it('PUT /tasks/:id should update a task', async () => {
    const updatedTaskData = { title: 'Nueva tarea', description: 'Descripción',estado:'pendiente',fechaVencimiento:'2025-02-28T00:00:00.000Z', usuarioId: 1};

    const response = await request(app.getHttpServer())
      .put(`/tasks/${createdTaskId}`)
      .send(updatedTaskData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTaskData.title);
  });

  // Eliminar una tarea
  it('DELETE /tasks/:id should delete a task', async () => {
    const response = await request(app.getHttpServer()).delete(`/tasks/${createdTaskId}`);
    expect(response.status).toBe(200);

    const getResponse = await request(app.getHttpServer()).get(`/tasks/${createdTaskId}`);
    expect(getResponse.status).toBe(404);
  });
});
