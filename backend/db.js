const mongoose = require('mongoose');

// Use MongoDB URI from environment variables, fallback to localhost for development
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/inotebook?readPreference=primary';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if there's an error
    }
};

module.exports = connectToMongo;
// mongodb+srv://Suraj_78725:<password>@cluster0.og3sv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
