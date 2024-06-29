import mongodb from 'mongodb';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   * Initializes the connection to the MongoDB server using environment variables for configuration.
   */
  constructor() {
    envLoader(); // Load environment variables

    // Define the MongoDB connection parameters
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    // Create a new MongoDB client and connect to the server
    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean} True if the connection is active, otherwise false.
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>} A promise that resolves to the number of users.
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>} A promise that resolves to the number of files.
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
