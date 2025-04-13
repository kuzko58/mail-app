// mongo-init.js

db = db.getSiblingDB('mail_app');

print('hello');

const user1 = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: '$2b$10$l3A8hVRJHLDd1euW5QiGve.hyE0uXJecZ9fhJ7KoRbf3DbFwtE0EK', //password1
  secret:
    '130,219,245,252,240,95,6,22,121,243,53,74,125,103,146,234,241,187,99,228,145,243,195,156,166,175,54,254,138,62,179,105',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user2 = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
  password: '$2b$10$j.behwS0FpAZC.KXfK.xCea1CXU0FyVtE5GU.GV88SQPij.Dn92je', //password2
  secret:
    '124,245,232,149,12,235,139,139,189,18,136,197,146,233,228,83,246,26,56,166,92,74,108,61,60,151,3,197,30,35,124,124',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const user1Id = db.users.insertOne(user1).insertedId;
print('user1', user1Id);
const user2Id = db.users.insertOne(user2).insertedId;

const messages = [];

for (let i = 1; i <= 40; i++) {
  messages.push({
    subject: `Message ${i}`,
    content: `This is the content of message #${i}`,
    isRead: i % 3 === 0,
    isDeleted: false,
    recipient: i % 5 === 0 ? user2Id : user1Id,
    sender: i % 5 === 0 ? user1Id : user2Id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

db.messages.insertMany(messages);
