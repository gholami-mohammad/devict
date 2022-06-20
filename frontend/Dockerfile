FROM node:latest as builder
WORKDIR /build
COPY ./ /build/
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=builder /build/dist/phrase-book/ /srv/frontend
COPY ./docker-configs/nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
