## cron jobs

cron jobs are those jobs that are going to run in future at specified time after a regular interval. like some task is going to be run on every month's 1st.

to create in nodejs we can use a module called "node-cron" below is the syntax for create a cron job that is going to run on every month's 1st at 1 pm.

```diff

+ const cron = require('node-cron');

+ cron.schedule('00 13 1 * *', () => {
+   console.log('running a task every minute');
+ });

```

#### use case

- Scheduled backups or data synchronization between different systems.
- Regular system maintenance tasks like log rotation or database cleanup.
- reporting tasks.
