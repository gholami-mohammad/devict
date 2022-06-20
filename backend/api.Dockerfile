FROM nginx:latest

COPY ./docker-configs/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY ./public /srv/backend/public
EXPOSE 80
EXPOSE 443/tcp
EXPOSE 443/udp
