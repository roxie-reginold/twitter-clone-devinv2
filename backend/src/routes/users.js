const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password')
      .populate('followers', 'name username avatar')
      .populate('following', 'name username avatar');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'bio', 'location', 'website', 'avatar', 'coverImage'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }
    
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    
    res.json({ user: req.user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/follow/:id', auth, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }
    
    const userToFollow = await User.findById(req.params.id);
    
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (req.user.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: 'Already following this user' });
    }
    
    req.user.following.push(userToFollow._id);
    userToFollow.followers.push(req.user._id);
    
    await req.user.save();
    await userToFollow.save();
    
    res.json({ message: 'Successfully followed user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/unfollow/:id', auth, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    
    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!req.user.following.includes(userToUnfollow._id)) {
      return res.status(400).json({ message: 'Not following this user' });
    }
    
    req.user.following = req.user.following.filter(id => id.toString() !== userToUnfollow._id.toString());
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== req.user._id.toString());
    
    await req.user.save();
    await userToUnfollow.save();
    
    res.json({ message: 'Successfully unfollowed user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:username/followers', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate('followers', 'name username avatar bio');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ followers: user.followers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:username/following', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate('following', 'name username avatar bio');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ following: user.following });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
