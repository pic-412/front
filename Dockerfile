FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run docker

FROM node:20-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 88

CMD ["npx", "http-server", "/usr/share/nginx/html", "-p", "88"]