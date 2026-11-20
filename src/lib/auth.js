import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.DB_NAME || 'fixmate');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: (process.env.TRUSTED_ORIGINS || 'http://localhost:3000').split(','),
  emailAndPassword: { enabled: true, autoSignIn: true, minPasswordLength: 6 },
  user: { additionalFields: {
    role: { type: 'string', defaultValue: 'customer', input: true },
    phone: { type: 'string', required: false }, area: { type: 'string', required: false }, bio: { type: 'string', required: false },
  } },
  databaseHooks: { user: { create: { before: async (user) => ({
    data: { ...user, role: ['customer', 'technician'].includes(user.role) ? user.role : 'customer' },
  }) } } },
});
