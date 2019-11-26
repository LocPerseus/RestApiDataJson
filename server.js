const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
console.log(process.env);
const app = require('./app');
const PORT = process.env.PORT || 3000;
// 4) START SERVER
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));