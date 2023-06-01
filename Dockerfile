# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV production
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm",  "start", "0.0.0.0"]