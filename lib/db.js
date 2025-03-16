import { MongoClient, ObjectId } from "mongodb";
import { ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}
const uri = process.env.MONGODB_URI;

const clientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

async function getClient() {
  const client = new MongoClient(uri, clientOptions);
  await client.connect();
  return client;
}

export async function insertDb(document) {
  let client;
  try {
    client = await getClient();

    if (
      document.applicationURL &&
      !document.applicationURL.match(/^https?:\/\//)
    ) {
      document.applicationURL = `https://${document.applicationURL}`;
    }

    if (!document.timestamp) {
      document.timestamp = new Date().toISOString();
    }

    const db = client.db("job_board");
    const result = await db.collection("job_posts").insertOne(document);
    console.log(`Document inserted with ID: ${result.insertedId}`);
    return result;
  } catch (error) {
    console.error("Error inserting document:", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function getAllJobs() {
  let client;
  try {
    client = await getClient();
    const db = client.db("job_board");
    const jobs = await db.collection("job_posts").find({}).toArray();

    return jobs.map((job) => ({
      _id: job._id.toString(),
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      type: job.type,
      companyName: job.companyName,
      applicationURL: job.applicationURL,
      timestamp: job.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function getJobById(id) {
  let client;
  try {
    client = await getClient();
    const db = client.db("job_board");

    const job = await db
      .collection("job_posts")
      .findOne({ _id: ObjectId.createFromHexString(id) });
    console.log(job);

    if (!job) return null;

    return {
      _id: job._id.toString(),
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      type: job.type,
      companyName: job.companyName,
      applicationURL: job.applicationURL,
      timestamp: job.timestamp,
    };
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  } finally {
    if (client) {
      await client.close();
    }
  }
}
