const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

    //routes
    const authRoutes = require('./routes/auth');
    const adminRoutes = require('./routes/admin/auth');
    const categoryRoutes = require('./routes/category');
    const productRoutes = require('./routes/product');
    const cartRoutes = require('./routes/cart');

    
    

   env.config();
   mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@devconnector.ja4oa.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
       {
          useNewUrlParser: true,
          useUnifiedTopology: true,
           useCreateIndex:true
       }
    ).then(() => {
        console.log('database connected')
   });

   app.use(express.json());
   app.use('/api',authRoutes);
   app.use('/api',adminRoutes);
   app.use('/api',categoryRoutes);
   app.use('/api',productRoutes);
   app.use('/api',cartRoutes);




   app.listen(process.env.PORT,() => {
      console.log(`Server is running on port ${process.env.PORT}`)
   });