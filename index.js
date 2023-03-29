import express from 'express';
import dotenv from 'dotenv';
import { fetchRewrittenCode } from './src/errors.js';
import { addComments } from './src/comments.js';
import { conventions } from './src/conventions.js';
import { professional } from './src/professional.js';
import { findBugs } from './src/findBugs.js';
import { explain } from './src/explain.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});
app.use(limiter);

// Run the add error handling promt
app.post('/errors', async (req, res) => {
  const textContent = req.body.text;

  try {
    const chatResponse = await fetchRewrittenCode(textContent);
    res.status(200).json({ status: 'Request processed successfully', response: chatResponse });
  } catch (error) {
    res.status(500).json({ status: 'Error processing the request', error: error.message });
  }
});

// Run the add comments promt
app.post('/comments', async (req, res) => {
    const textContent = req.body.text;
  
    try {
      const chatResponse = await addComments(textContent);
      res.status(200).json({ status: 'Request processed successfully', response: chatResponse });
    } catch (error) {
      res.status(500).json({ status: 'Error processing the request', error: error.message });
    }
  });

  // Run the add conventions promt
app.post('/conventions', async (req, res) => {
    const textContent = req.body.text;
  
    try {
      const chatResponse = await conventions(textContent);
      res.status(200).json({ status: 'Request processed successfully', response: chatResponse });
    } catch (error) {
      res.status(500).json({ status: 'Error processing the request', error: error.message });
    }
  });

    // Run the professionalize promt
app.post('/professional', async (req, res) => {
    const textContent = req.body.text;
  
    try {
      const chatResponse = await professional(textContent);
      res.status(200).json({ status: 'Request processed successfully', response: chatResponse });
    } catch (error) {
      res.status(500).json({ status: 'Error processing the request', error: error.message });
    }
  });

      // Run the explain promt
app.post('/explain', async (req, res) => {
    const textContent = req.body.text;
  
    try {
      const chatResponse = await explain(textContent);
      res.status(200).json({ status: 'Request processed successfully', response: chatResponse });
    } catch (error) {
      res.status(500).json({ status: 'Error processing the request', error: error.message });
    }
  });

        // Run the look for bugs promt
app.post('/bugs', async (req, res) => {
  const textContent = req.body.text;

  try {
    const chatResponse = await explain(textContent);
    res.status(200).json({ status: 'Request processed successfully', response: chatResponse });
  } catch (error) {
    res.status(500).json({ status: 'Error processing the request', error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
