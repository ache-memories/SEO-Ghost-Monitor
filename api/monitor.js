const axios = require('axios');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Please provide a URL" });

  try {
    const response = await axios.get(url);
    const html = response.data;
    const hash = crypto.createHash('md5').update(html).digest('hex');

    res.status(200).json({
      url: url,
      current_hash: hash,
      message: "Site analyzed successfully by SEO-Ghost-Monitor"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the site. Check the URL." });
  }
};
