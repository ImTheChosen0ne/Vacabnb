// Other router.use statements and
// Export statement

// backend/routes/api/maps.js
const router = require('express').Router();
const { googleMapsAPIKey } = require('../../config');

router.post('/key', (req, res) => {
  res.json({ googleMapsAPIKey });
});

module.exports = router;