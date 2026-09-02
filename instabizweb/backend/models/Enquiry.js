const mongoose = require('mongoose');

const SERVICES = [
  'Website Development',
  'Web/Mobile App Development',
  'CRM',
  'ERP/Odoo',
  'Custom Software',
  'Business Automation',
  'AI Automation',
  'API Integration',
  'Digital Marketing',
  'Other',
];

const STATUS = ['New', 'In Review', 'Contacted', 'Closed'];

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\+?[\d\s\-()\\.]{7,20}$/, 'Please enter a valid phone number'],
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [150, 'Company name cannot exceed 150 characters'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      enum: {
        values: SERVICES,
        message: 'Please select a valid service',
      },
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: STATUS,
      default: 'New',
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

// Index for search performance
enquirySchema.index({ email: 1, createdAt: -1 });
enquirySchema.index({ status: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
