const Enquiry = require('../models/Enquiry');

// @route  POST /api/enquiries
// @access Public — website contact form
const createEnquiry = async (req, res) => {
  try {
    const { fullName, email, phone, companyName, service, message } = req.body;

    const enquiry = await Enquiry.create({
      fullName,
      email,
      phone,
      companyName,
      service,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will get back to you soon!',
      data: enquiry,
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: messages[0],
        errors: messages,
      });
    }
    console.error('Create enquiry error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route  GET /api/enquiries
// @access Private (admin)
// Query params: page, limit, search, status, service
const getAllEnquiries = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    // Build filter
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.service) {
      filter.service = req.query.service;
    }

    if (req.query.search) {
      const regex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { fullName: regex },
        { email: regex },
        { companyName: regex },
        { phone: regex },
      ];
    }

    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Enquiry.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Get all enquiries error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route  GET /api/enquiries/:id
// @access Private (admin)
const getEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid enquiry ID.' });
    }
    console.error('Get enquiry error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route  PUT /api/enquiries/:id
// @access Private (admin)
const updateEnquiry = async (req, res) => {
  try {
    const allowed = ['fullName', 'email', 'phone', 'companyName', 'service', 'message', 'status'];
    const updates = {};
    allowed.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: enquiry,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid enquiry ID.' });
    }
    console.error('Update enquiry error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route  DELETE /api/enquiries/:id
// @access Private (admin)
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid enquiry ID.' });
    }
    console.error('Delete enquiry error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route  GET /api/enquiries/stats
// @access Private (admin)
const getStats = async (req, res) => {
  try {
    const [total, byStatus, byService] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Enquiry.aggregate([
        { $group: { _id: '$service', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ]);

    res.status(200).json({
      success: true,
      data: { total, byStatus, byService },
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getStats,
};
