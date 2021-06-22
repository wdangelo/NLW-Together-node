import express from 'express';

const app = express();

app.get('/test', (req, res) => {
    return res.json({tipo: 'GET'})
})

app.post('/test-post', (req, res) => {
    return res.json({tipo: 'POST'})
})

app.listen(3000, () => console.log('Server is runing'))