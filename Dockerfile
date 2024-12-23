FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .

RUN npm run docker

EXPOSE 80
CMD ["npm", "run","preview"]

# FROM node:20-alpine

# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["npx", "http-server", "/usr/share/nginx/html", "-p", "80"]