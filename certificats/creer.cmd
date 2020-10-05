# windows Étudiant l'a essayé mais obtient cette erreur
#   err_ssl_version_or_cipher_mismatch
# Je ne sais pas si l'erreur est dû à une mauvais manip de sa part.

"C:\Program Files\OpenSSL-Win64\bin\openssl" req -x509 -nodes -days 365 -newkey rsa:2048 -keyout certificat.key -out certificat.pem -config configuration.cnf -sha256

