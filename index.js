const { createApp } = require('./src/todo.js');
require('dotenv').config();
const cluster = require('cluster');
const CPUs = require('os').cpus();

const forkWorkers = () => {
  CPUs.forEach((CPU) => {
    console.log('\nCreating fork');
    console.info(CPU);
    cluster.fork();
    console.log('Finished creating fork');
  });
};

const onExit = (worker, code, signal) => {
  console.error(`\nWorker ${worker.process.pid} died`);
  console.info({ code, signal });
  console.log("Let's fork another worker!");
  cluster.fork();
};

const main = () => {
  const { path, db, env, PORT, sessionKeys } = process.env;
  const config = {
    path,
    db,
    env,
    session: JSON.parse(sessionKeys),
  };
  if (cluster.isMaster) {
    console.log(`Number of CPUs is ${CPUs.length}`);
    console.log(`Master ${process.pid} is running`);

    forkWorkers();

    cluster.on('exit', onExit);
  } else {
    const app = createApp(config);
    app.listen(+PORT, () =>
      console.log(
        `\nWorker ${process.pid} listening on port ${PORT}
        Server started at http://localhost:${PORT}`
      )
    );
  }
};

main();
