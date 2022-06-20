FROM mysql:8.0 as mysql

FROM php:8.1-fpm

ENV TZ=Asia/Tehran
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt update
RUN apt -y install libonig-dev libzip-dev libcurl4-openssl-dev libxml2-dev supervisor
# Install php and required extensions
RUN docker-php-ext-install -j$(nproc) mbstring pdo zip curl xml mysqli pdo_mysql
RUN docker-php-ext-enable pdo_mysql

COPY docker-configs/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /srv/backend
RUN mkdir -p /srv/backend
COPY . /srv/backend
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN chmod 777 storage/logs -R
RUN chmod 777 storage/framework -R

# Copy mysql client binary files
COPY --from=mysql /usr/bin/mysqldump /usr/bin/mysqldump

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

EXPOSE 9000
