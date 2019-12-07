FROM node:12.13.0-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli@8.3.17

CMD npm install && ng serve --host 0.0.0.0 --port 4200
