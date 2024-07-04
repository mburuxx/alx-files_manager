// controllers/UsersController.js
import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import Queue from 'bull';
// import { dbClient as db } from '../utils/db';
import dbClient from '../utils/db';
import { redisClient } from '../utils/redis';

const userQueue = new Queue('email sending'); // Ensure the queue name matches the one in worker.js

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      const usersCollection = dbClient.collection('users');
      const existingUser = await usersCollection.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      const hashedPassword = sha1(password);
      const newUser = {
        email,
        password: hashedPassword,
      };

      const result = await usersCollection.insertOne(newUser);
      const user = result.ops[0];

      userQueue.add({ userId: user._id.toString() }); // Ensure userId is a string

      return res.status(201).json({ email: user.email, id: user._id });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const redisKey = `auth_${token}`;
    const userId = await redisClient.get(redisKey);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const usersCollection = dbClient.collection('users');
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      return res.status(200).json({ email: user.email, id: user._id });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
