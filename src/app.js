require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { MONGODB_URI } = process.env;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const storeRoutes = require('./routes/store');
const reviewRouter = require('./routes/review');
const boardRouter = require('./routes/board');
const commentRouter = require('./routes/comment');
const bannerRouter = require('./routes/banner');
const verifyLogin = require('./middlewares/loginValidator');

const connectToDatabase = async (url) => {
    try {
        await mongoose.connect(url, {
            dbName: 'tastyTogether',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('연결성공');
    } catch (err) {
        console.log('연결실패', err);
    }
};

const url = MONGODB_URI;

const corsOption = { origin: 'http://localhost:3000', credentials: true };

connectToDatabase(url);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(cookieParser());
app.use('/public', express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/stores', storeRoutes);
app.use('/api/review', reviewRouter);
app.use('/api/banner', bannerRouter);
app.use('/api', boardRouter);
app.use('/api', verifyLogin, commentRouter);
app.use('/api/user', verifyLogin, userRouter);

app.use((req, res, next) => {
    const error = new Error('Resource Not Found');
    error.statusCode = 404;
    next(error);
});

app.use((err, res) => {
    console.error(err);
    res.status(err.statusCode || 500);
    res.json({ status: err.status, reason: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`정상적으로 TastyTogether 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
