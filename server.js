const express = require('express');
const app = express();

const path = require('path');
 
app.use(express.static('src'));
app.get('/', (req, res) => {
    console.log({res,req});
    res.sendFile(path.join(__dirname + '/index.html'));
})

const port = 1337;
app.listen(port, ()=> console.log(`Server running on port: ${port}`))