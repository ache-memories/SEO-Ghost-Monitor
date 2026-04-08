const axios = require('axios');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "يرجى تزويد رابط للموقع" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000 
    });

    const hash = crypto.createHash('md5').update(String(response.data)).digest('hex');

    res.status(200).json({
      url: url,
      current_hash: hash,
      message: "تم فحص الموقع بنجاح بواسطة SEO-Ghost-Monitor"
    });
  } catch (error) {
    res.status(500).json({ 
      error: "فشل في جلب بيانات الموقع",
      details: error.message 
    });
  }
};
