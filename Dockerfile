FROM node:15-alpine AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

FROM node:15-alpine AS run

ENV NODE_ENV production
EXPOSE 8000

WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=build /app/build ./build
COPY --from=build /app/src ./src

RUN npm ci
CMD npm start
