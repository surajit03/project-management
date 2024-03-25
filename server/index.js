const connectToMOngo =require('./db')
const express = require('express');
const cookieParser = require('cookie-parser');
let cors =require('cors')


const port = 5000;
const app = express();
connectToMOngo();

app.use(cors());
app.use(express());
 
// midel wier
app.use(express.json());
app.use(cookieParser());

// Available router
app.use('/api/auth',require('./routers/auth.js'))
app.use('/api/room',require('./routers/room-rout.js'))
app.use('/api',require('./routers/project-rout.js'))



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});