const express = require('express');
const router = express.Router();
const Trash = require('../models/Trash');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// @route   GET /api/trash
router.get('/', auth, async (req, res) => {
  try {
    const trash = await Trash.find({ userId: req.user.id }).sort({ deletedAt: -1 });
    res.json(trash);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/trash/restore/:id
router.post('/restore/:id', auth, async (req, res) => {
  try {
    const trashItem = await Trash.findById(req.params.id);
    if (!trashItem) return res.status(404).json({ msg: 'Trash item not found' });
    if (trashItem.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    // Prepare the original job data for restoring
    const jobData = { ...trashItem.originalJob };
    // Remove the original _id to let MongoDB generate a new one
    delete jobData._id;
    // Optionally reset createdAt to now (or keep original – your choice)
    jobData.createdAt = new Date();

    const restoredJob = new Job(jobData);
    restoredJob.userId = req.user.id;
    await restoredJob.save();

    await Trash.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Job restored successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/trash/:id (permanent delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const trashItem = await Trash.findById(req.params.id);
    if (!trashItem) return res.status(404).json({ msg: 'Trash item not found' });
    if (trashItem.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    await Trash.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Permanently deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// TODO: Add a scheduled job (cron) to auto‑delete trash items older than retention days
// (retention will be stored in user settings)

module.exports = router;