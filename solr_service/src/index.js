const express = require('express');
const app = express();
const router = require('./rest-services');

app.use(express.json());

app.use('/', router);
const PORT = 3010;
app.listen(PORT, () => {
    console.log(`server is listen on port no ${PORT}`);
})

