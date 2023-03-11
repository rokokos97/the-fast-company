const express = require('express');
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose').default;
const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

async function start() {
  try {
    mongoose.connection.once('open', ()=>{
      initDatabase();
    });
    await mongoose.connect(config.get('mongoUri'));
    console.log(chalk.green('MongoDB connected'));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server hes been started on port ${PORT}...`));
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();

