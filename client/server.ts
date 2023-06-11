import express from 'express';
import cors from 'cors';

// Create an Express app
const app = express();

// Enable CORS middleware
app.use(cors());

// Start the server
app.listen(3001, () => {
  console.log('server listening on port 3001');
});
