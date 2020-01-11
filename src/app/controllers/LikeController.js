import Dev from '../models/Dev';

class LikeController {
  async store(req, res) {
    const { user } = req.headers;
    const { targetId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(targetId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    if (targetDev.likes.includes(user)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[targetId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
}

export default new LikeController();
