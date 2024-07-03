import { writeFile } from 'fs';
import { promisify } from 'util';
import Queue from 'bull';
import imgThumbnail from 'image-thumbnail';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './utils/db';
import Mailer from './utils/mailer';

const writeFileAsync = promisify(writeFile);
const fileQueue = new Queue('thumbnail generation');
const userQueue = new Queue('email sending');

/**
 * Generates the image thumbnail
 * @param {String} filePath The location of the original file.
 * @param {number} size The width of the thumbnail.
 * @returns {Promise<void>}
 */
const generateThumbnail = async (filePath, size) => {
  const buffer = await imgThumbnail(filePath, { width: size });
  console.log(`Generating file: ${filePath}, size: ${size}`);
  return writeFileAsync(`${filePath}_${size}`, buffer);
};

fileQueue.process(async (job, done) => {
  const { fileId, userId } = job.data;

  if (!fileId) {
    done(new Error('Missing fileId'));
    return;
  }
  if (!userId) {
    done(new Error('Missing userId'));
    return;
  }

  try {
    const file = await (await dbClient.filesCollection())
      .findOne({
        _id: new mongoDBCore.BSON.ObjectId(fileId),
        userId: new mongoDBCore.BSON.ObjectId(userId),
      });

    if (!file) {
      done(new Error('File not found'));
      return;
    }

    const sizes = [500, 250, 100];
    await Promise.all(sizes.map((size) => generateThumbnail(file.localPath, size)));
    done();
  } catch (error) {
    done(error);
  }
});

userQueue.process(async (job, done) => {
  const { userId } = job.data;

  if (!userId) {
    done(new Error('Missing userId'));
    return;
  }

  try {
    const user = await (await dbClient.usersCollection())
      .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });

    if (!user) {
      done(new Error('User not found'));
      return;
    }

    console.log(`Welcome ${user.email}!`);

    const mailSubject = 'Welcome to ALX-Files_Manager';
    const mailContent = [
      '<div>',
      `<h3>Hello ${user.name},</h3>`,
      'Welcome to <a href="https://github.com/mburuxx/alx-files_manager">',
      'ALX-Files_Manager</a>, ',
      'a simple file management API built with Node.js by ',
      '<a href="https://github.com/mburuxx">John Mburu</a> and ',
      '<a href="https://github.com/Kaywuyep">Kate Wuyep</a>. ',
      'We hope it meets your needs.',
      '</div>',
    ].join('');

    await Mailer.sendMail(Mailer.buildMessage(user.email, mailSubject, mailContent));
    done();
  } catch (error) {
    done(error);
  }
});
