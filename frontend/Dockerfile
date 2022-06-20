FROM node:latest as builder
WORKDIR /build
COPY ./ /build/
RUN npm install

FROM nginx:latest
COPY --from=builder /build/dist/phrase-book/ /srv/frontend
COPY ./docker-configs/nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
