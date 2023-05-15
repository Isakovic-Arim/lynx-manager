FROM denoland/deno:alpine as backend

WORKDIR /app

COPY . .

RUN deno cache --unstable main.ts

EXPOSE 8000

CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "--unstable", "main.ts"]

# FROM node:alpine as backend

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm ci --production

# COPY . .

# EXPOSE 8000

# CMD ["node", "main.js"]
