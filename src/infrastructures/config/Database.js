import mongoose from "mongoose";

class Database {
    constructor() {
        if (new.target === Database) {
            throw new Error("Database cannot be instantiated directly")
        }
    }

    connect(bdUrl) {
        throw new Error("Method 'connect()' must be implemented by subclass");
    }
}

export class MongoClient extends Database {
    async connect(bdUrl) {
        try {
            await mongoose.connect(bdUrl);
        } catch (error) {
            process.exit(1);
        }
    }
}
