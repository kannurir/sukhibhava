// server/server.js
     const express = require('express');
     const bodyParser = require('body-parser');
     const mongoose = require('mongoose');
     const path = require('path');
     const User = require('./models/user');

     const app = express();
     const PORT = process.env.PORT || 3000;

     // Replace <password> and <your-cluster-url> with your actual password and cluster URL from MongoDB Atlas
//mongodb+srv://kannurir:Rajesh2024!@cluster1.ci5yxlu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
     const mongoUri = 'kannurir:Rajesh2024!@cluster1.ci5yxlu.mongodb.net/myDatabase?retryWrites=true&w=majority';

     mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({ extended: true }));

     app.use(express.static(path.join(__dirname, '../public')));

     app.post('/login', async (req, res) => {
         const { email, password } = req.body;

         try {
             const user = await User.findOne({ email, password });
             if (user) {
                 res.send({ message: 'Login successful!' });
             } else {
                 res.status(401).send({ message: 'Invalid email or password' });
             }
         } catch (error) {
             console.error(error);
             res.status(500).send('Internal Server Error');
         }
     });

     app.post('/signup', async (req, res) => {
         const { firstName, lastName, email, password } = req.body;

         try {
             const user = new User({ firstName, lastName, email, password });
             await user.save();
             res.send({ message: 'Sign up successful!' });
         } catch (error) {
             console.error(error);
             res.status(500).send('Internal Server Error');
         }
     });

     app.listen(PORT, () => {
         console.log(`Server is running on http://localhost:${PORT}`);
     });
