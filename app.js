const app = require('./bootstrap');

app.server.listen(app.port, () => {
  console.log(`App listening on port ${app.port}!`);
});
