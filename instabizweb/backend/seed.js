/**
 * Seed script — creates the initial admin account
 * Run once: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      console.log(`⚠️  Admin already exists: ${process.env.ADMIN_EMAIL}`);
      process.exit(0);
    }

    const admin = await Admin.create({
      name:     process.env.ADMIN_NAME     || 'Admin',
      email:    process.env.ADMIN_EMAIL    || 'admin@instabizweb.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
    });

    console.log('✅ Admin created successfully!');
    console.log(`   Name:  ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Login at: /admin`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

seed();
