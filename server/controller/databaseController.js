var mongoose = require('mongoose');

// Todo: Secure the hardcoded password
// uri: mongodb://username:password@host:port/database?options...
const DATABASE_URI = 'mongodb://swag:devpw9123123@lifecode.iptime.org:37017/admin';

const eventSchema = new mongoose.Schema({
    session_id: String,
    user_id: String,
    nickname: String,
    start_time: Date,
    end_time: Date,
    pw: String,
});

async function connectDB() {
    let db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', () => {
        console.log("Connected to MongoDB server");
    });

    await mongoose.connect(DATABASE_URI, {useNewUrlParser: true, 'useUnifiedTopology': true});
}

let Event = mongoose.model('Event', eventSchema);

export {connectDB, Event}