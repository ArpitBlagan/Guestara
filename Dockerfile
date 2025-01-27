FROM node:20/alpine

WORKDIR /usr/assignment/src

COPY package*json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 8090

CMD [ "npm","run","dev" ]