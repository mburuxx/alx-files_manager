// controllers/AppController.js
/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';
/* eslint-enable import/no-named-as-default */

class AppController {
  /**
   * Returns the status of the Redis and MongoDB connections.
   * @param {Request} req
   * @param {Response} res
   */
  static async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  /**
   * Returns the statistics of the number of users and files in the database.
   * @param {Request} req
   * @param {Response} res
   */
  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    res.status(200).json({ users: usersCount, files: filesCount });
  }
}

export default AppController;
