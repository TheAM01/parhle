import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("❌ MONGO_URI is not defined in .env.local");

// Create a single MongoDB client instance
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Ensure we only connect once
if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect().then(() => {
        console.log("✅ Connected to MongoDB");
        return client;
    }).catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });
}

export default (await global._mongoClientPromise).db("parhle");
