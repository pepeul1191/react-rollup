# Express Base


Archivo <b>.env</b>

DB="sqlite:///db/demo.db"
ENV="local"
MAIL_PORT=465
MAIL_USER="xyz@gmail.com"
MAIL_PASS="asdfas"
MAIL_HOST="smtp.google.com"

### Migraciones

Migraciones con DBMATE - accesos/sqlite3:

    $ npm run dbmate:new <<nombre_de_migracion>>
    $ npm run dbmate:up
    $ npm run dbmate:rollback

---

Fuentes:

+ https://www.codeguage.com/blog/setup-rollup-for-react
