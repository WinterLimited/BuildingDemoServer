import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

// import url
import url from 'url';
import path from "path";

// import bycrypt
import bcrypt from 'bcrypt';

dotenv.config();

const { fileURLToPath } = url;

const app = express();
const port = 3000;
const { Pool } = pkg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// PostgreSQL 데이터베이스 설정
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

app.use(cors());
app.use(bodyParser.json());

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
    const { id, name, email, phone, password, occupation } = req.body;

    if (!id || !name || !email || !phone || !password || !occupation) {
        return res.status(400).json({ success: false, message: '모든 필드를 채워주세요.' });
    }

    try {
        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10); // 10은 솔트 라운드 수

        console.log(`회원가입 요청: ${id}, ${name}, ${email}, ${phone}, ${hashedPassword}, ${occupation}`);
        const result = await pool.query('INSERT INTO users (id, name, email, phone, password, occupation) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, email, phone, hashedPassword, occupation]);

        res.status(200).json({ success: true, message: '회원가입 성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
});


// React 앱 서비스
// 정적 파일 제공 설정 추가
app.use(express.static(path.join(__dirname, '../frontend/build')));

// 모든 GET 요청에 대해 React 앱 서비스
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
