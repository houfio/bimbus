FROM node:15-alpine AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

FROM node:15-alpine AS run

ENV NODE_ENV production
EXPOSE 3000

WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=build /app/.next ./.next

RUN npm ci
CMD npm start
