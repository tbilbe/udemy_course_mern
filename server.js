const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDb = require('./config/db');

connectDb();

// middlewares
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('YO YO YO'));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/houses', require('./routes/api/houseProfiles'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

app.listen(PORT, () => {
	console.log(`app awake mofo! listing on port: ${PORT}`);
});
