FROM node:alpine as backend

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@^7.0.0 && \
    pnpm install

COPY . .

EXPOSE 8000

CMD ["pnpm", "start", "server-dev"]