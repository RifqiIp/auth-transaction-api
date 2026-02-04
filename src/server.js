require('dotenv').config();
const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('🕒 DB Time:', result.rows[0]);
  } catch (err) {
    console.error('❌ DB connection failed', err);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
