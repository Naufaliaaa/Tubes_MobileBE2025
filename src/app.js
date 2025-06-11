const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require("dotenv").config();

const middlewares = require("./middlewares");
const router = require("./routes/index");
const swaggerSetup = require("./config/swagger");

const app = express();

const postRoutes = require("./routes/postRoutes");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api", postRoutes);

swaggerSetup(app);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Dokumentasi API untuk backend ini',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // sesuaikan lokasi file yang berisi dokumentasi swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/", (req, res) => {
  res.json({
    message: "Assalamualaikum",
  });
});

app.use("/", router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
