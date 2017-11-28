const fs = require('fs');
const path = require('path');
module.exports = {
  index(req, res) {
    res.status(200).json(JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/layers.json'))));
  }
};