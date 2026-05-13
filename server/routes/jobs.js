const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Trash = require('../models/Trash');   // <-- added
const auth = require('../middleware/auth');

// @route   GET /api/jobs
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/jobs
router.post('/', auth, async (req, res) => {
  try {
    const newJob = new Job({
      ...req.body,
      userId: req.user.id
    });
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/jobs/:id
router.put('/:id', auth, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    if (job.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    job = await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/jobs/:id  (move to trash instead of permanent delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    if (job.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    // Move to Trash collection
    const trashItem = new Trash({
      userId: req.user.id,
      originalJob: job.toObject()
    });
    await trashItem.save();

    // Delete from Jobs collection
    await Job.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Job moved to trash' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   PATCH /api/jobs/:id/pin
router.patch('/:id/pin', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    if (job.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    job.isPinned = !job.isPinned;
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;