// server.js
import express from 'express';
import routes from './routes/index';

// Load environment variables
import envLoader from './utils/env_loader';
envLoader();

const app = express();
const port = process.env.PORT || 5000;

// Load all routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
