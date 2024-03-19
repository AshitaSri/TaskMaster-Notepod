const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ashitasri0405:0405@cluster0.ecuvv63.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


module.exports = mongoose;