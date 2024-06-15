# Steps

- setup schema

```bash
npx prisma init --datasource-provider {db_type e.g mysql}
```

- add your model in `schema.prism` file

- run migration

```bash
npx prisma migrate dev --name init
```

You may use now `PrismaClient` from `@prisma/client` to run query against your database.

___

To start the `Mysql` `docker` container go to project root and run below command

```bash
make mysql

```

To stop the `MySql` Container run

```bash
make down_mysql
```

Note - make command by default work on unix environment but for windows environment need to install `make` utility first.
