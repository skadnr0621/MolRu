FROM mysql:latest
MAINTAINER namwook <skadnr0621@gmail.com>

ADD ./init /docker-entrypoint-initdb.d

EXPOSE 3306

CMD ["mysqld"]