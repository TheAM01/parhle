import { MongoClient, ServerApiVersion, type Db } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error("❌ MONGO_URI is not defined. Set it in .env.local (see .env.example).");
}

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

// Reuse a single MongoClient across hot-reloads in development and across
// invocations in production. The driver connects lazily on the first
// operation, so we do NOT await connect() at module scope — a transient
// connection failure surfaces per-request (caught by each route) instead of
// crashing the whole server process.
declare global {
    // eslint-disable-next-line no-var
    var _mongoClient: MongoClient | undefined;
}

const client = global._mongoClient ?? new MongoClient(uri, options);
if (process.env.NODE_ENV !== "production") {
    global._mongoClient = client;
}

const db: Db = client.db("parhle");

export default db;
