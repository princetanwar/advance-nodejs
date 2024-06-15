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
