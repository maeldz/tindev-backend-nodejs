import axios from 'axios';

import Dev from '../models/Dev';

class DevController {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ],
    });

    return res.json(users);
  }

  async store(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const userData = await axios.get(
      `https://api.github.com/users/${username}`,
    );

    const { name, login, bio, avatar_url } = userData.data;

    const dev = await Dev.create({
      name,
      user: login,
      bio,
      avatar: avatar_url,
    });

    return res.json(dev);
  }
}

export default new DevController();
