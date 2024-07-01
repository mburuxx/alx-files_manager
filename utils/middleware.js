// utils/middleware.js
import express from 'express';

const configureMiddleware = (app) => {
  app.use(express.json()); // Add this line to parse JSON
};

export default configureMiddleware;
