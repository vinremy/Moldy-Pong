#!/bin/zsh
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout certificat.key -out certificat.pem -config configuration.cnf -sha256


# windows
# "C:\Program Files\OpenSSL-Win64\bin\openssl" req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout certificat.key -out certificat.pem -config configuration.cnf -sha256
