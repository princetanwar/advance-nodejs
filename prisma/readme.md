# Steps

- setup schema

```bash
npx prisma init --datasource-provider {db_type e.g mysql}
```

- add your model in `schema.prism` file

- create migration

```bash
npx prisma migrate dev --create-only --name {migration_file_name}
```

Note:- after creating the migration you can manually verify the `SQL` statements and make necessary changes if required.

- check the migration status

```bash
npx prisma migrate dev status   
```

- apply pending migration in dev

```bash
npx prisma migrate dev
```

- apply pending migration in staging/production

```bash
npx prisma migrate deploy
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
