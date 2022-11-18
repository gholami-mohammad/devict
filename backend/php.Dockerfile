FROM php:8.1-fpm

ENV TZ=Asia/Tehran
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update
RUN apt-get -y install supervisor
COPY docker-configs/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
# Install php extensions
RUN install-php-extensions mbstring pdo zip curl xml mysqli pdo_mysql

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# add app source code
WORKDIR /srv/backend
RUN mkdir -p /srv/backend
COPY . /srv/backend
RUN chmod 777 storage/logs -R
RUN chmod 777 storage/framework -R

# Copy mysql client binary files
COPY --from=mysql:8.0 /usr/bin/mysqldump /usr/bin/mysqldump

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

EXPOSE 9000
