# 🚀 NestJS Project Setup

## 📥 Clonar el repositorio
```sh
git clone https://github.com/stiv-developer/backend-task.git
cd backend-task
```

## 🛠️ Configuración del entorno
Configurar el archivo `.env` si quieres usar en local o en Docker
```env
# Para desarrollo local
DATABASE_URL="postgresql://postgres:root@localhost:5432/mydb?schema=public"

# Para Docker
# DATABASE_URL="postgresql://user:password@postgres:5432/mydb?schema=public"
```

## 🐳 Ejecutar con Docker
```sh
docker-compose up --build
```
Esto construirá la imagen y levantará PostgreSQL dentro de un contenedor. 
Luego de levantar el proyecto debes de ejecutar el siguiente comando para generar la BD sin tener que apagar el contenedor.

## 🔄 Aplicar migraciones de Prisma
Ejecutar comando para migrar BD
```sh
docker exec -it nest_app npx prisma migrate dev
```
Si necesitas reiniciar las migraciones:
```sh
docker exec -it nest_app npx prisma migrate reset --force
```

## ✅ Verificar que la API está corriendo
Abrir en el navegador o usar Postman:
```
http://localhost:3000
```

## 🔧 Ejecutar sin Docker (Modo Local)
1. Instalar PostgreSQL y asegurarse de que esté corriendo.
2. Modificar `.env` para usar `localhost` en lugar de `postgres` en `DATABASE_URL`.
3. Instalar dependencias y ejecutar la aplicación:
   ```sh
   npm install
   npm run start:dev
   ```
4. Aplicar migraciones manualmente:
   ```sh
   npx prisma migrate dev
   ```
## 📖 Documentación de la API (Swagger)
La API está documentada con **Swagger**. Puedes acceder a la documentación interactiva una vez que la aplicación esté en ejecución.

- **Si usas Docker**  
  Accede a:  
  ```
  http://localhost:3000/api/docs
  ```

- **Si ejecutas en modo local**  
  Accede a:  
  ```
  http://localhost:3000/api/docs
  ```

¡Listo! 🚀

