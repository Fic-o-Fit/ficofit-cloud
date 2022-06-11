FROM node:17-alpine3.14
RUN apk add libc6-compat

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["node", "app.js"]
EXPOSE 5000