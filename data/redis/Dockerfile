FROM redis:6.2-alpine
COPY redis.conf /usr/local/etc/redis/redis.conf


ARG port
EXPOSE $port

CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]