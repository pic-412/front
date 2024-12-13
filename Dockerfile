FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . . 
RUN npm run docker

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 88

CMD ["nginx", "-g", "daemon off;"]