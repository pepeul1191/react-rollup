# Express Base


Archivo <b>.env</b>

DB="sqlite:///db/demo.db"
ENV="local"||"server"
MAIL_PORT=465
MAIL_USER="xyz@gmail.com"
MAIL_PASS="asdfas"
MAIL_HOST="smtp.google.com"

### Migraciones

Migraciones con DBMATE - accesos/sqlite3:

    $ npm run dbmate:new <<nombre_de_migracion>>
    $ npm run dbmate:up
    $ npm run dbmate:rollback

```
my-react-app/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       ├── components/
│   │       ├── layouts/
│   │       └── App.css
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── feature1/
│   │   └── feature2/
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   └── Contact.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.js
│   ├── index.js
│   └── index.css
│
├── .gitignore
├── package.json
├── README.md
└── ...
```

VSCode Plugin

    Simple React Snippets

SVGs, usar inkscape, generar un png y luego usar la página https://picsvg.com/es/ usando el filtro internal 1.


---

Fuentes:

+ https://www.codeguage.com/blog/setup-rollup-for-react
