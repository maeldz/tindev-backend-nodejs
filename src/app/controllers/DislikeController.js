import Dev from '../models/Dev';

class DislikeController {
  async store(req, res) {
    const { user } = req.headers;
    const { targetId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(targetId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
}

export default new DislikeController();
