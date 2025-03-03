# Usa una imagen base de Node.js
FROM node:18-alpine AS builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias (incluyendo las de desarrollo)
RUN npm install

# Copia el resto del código fuente
COPY . .

# Genera el cliente de Prisma
RUN npx prisma generate

# Compila la aplicación NestJS
RUN npm run build

# ---

# Crea una nueva etapa para la imagen final (más ligera)
FROM node:18-alpine AS production

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expone el puerto que usa NestJS
EXPOSE 3000

# Comando para ejecutar la aplicación en producción
CMD ["npm", "run", "start:prod"]