const express = require('express');
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('port') ?? 8080;
app.listen(PORT, () => {
  console.log(chalk.green(`Server hes been started on port ${PORT}...`));
});
