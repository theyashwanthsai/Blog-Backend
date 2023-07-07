const Post = require('../models/Post');
const User = require('../models/User');

const getProfile = async (req, res) => {
  const customId = req.user.customId;
  const user = req.params.username;
    try {
        const userProfile = await User.findOne({ username: user  }).populate('posts');
        console.log(userProfile);
        if (!userProfile) {
          return res.status(404).json({ message: 'User profile not found' });
        }
    
        // Exclude sensitive fields if needed
        const { username, role, posts } = userProfile;
    
        res.json({ username, role, posts });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the user profile' });
      }
}


module.exports = {
  getProfile
  };