const express = require('express');
const db = require('./config/connection');
const allRoutes = require('./routes')
const { Thought, User } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use("/api", allRoutes)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Social media api running on ${PORT}`);
    });
  });
  