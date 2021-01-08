const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors')
const helmet = require('helmet')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const MyGraphQLSchema = require('./graphql')
const { graphqlHTTP } = require('express-graphql');
const DB_connection = require('./config/mongoDB');
const cloudinary_config = require('./config/cloudinary');
const apiRoutes = require('./routes')
const cookieParser = require('cookie-parser')


// middlewares
app.use(express.json({limit:"40mb"}))
app.use(fileUpload());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(cookieParser())
app.use(helmet({
  contentSecurityPolicy:false
}))

// api routes
app.use(
  '/graphql',
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  }),
);

app.use('/api', apiRoutes);


app.get('/', (req,res)=>{
  res.send("hello world");
})

app.listen(PORT, () => console.log(`Server started at ${PORT}`))