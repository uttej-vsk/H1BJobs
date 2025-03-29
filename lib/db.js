"use server";
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

export async function addPostedJobToDb(document) {
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
      document.posted_job_timestamp = new Date().toISOString();
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
export async function addSharedJobToDb(document) {
  let client;
  try {
    client = await getClient();

    if (document.postURL && !document.postURL.match(/^https?:\/\//)) {
      // match the postURL to ensure it is a valid URL of linkedin, twitter, etc.
      throw new Error("Invalid post URL");
    }

    if (!document.timestamp) {
      document.shared_job_timestamp = new Date().toISOString();
    }

    document.isShared = true;

    const db = client.db("job_board");
    const result = await db.collection("job_shares").insertOne(document);
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
    const sharedJobs = await db.collection("job_shares").find({}).toArray();
    return [...jobs, ...sharedJobs]
      .map((job) => ({
        _id: job._id.toString(),
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        type: job.type,
        companyName: job.companyName,
        applicationURL: job.applicationURL,
        posted_job_timestamp: job.posted_job_timestamp,
        shared_job_timestamp: job.shared_job_timestamp,
        isShared: job.isShared,
        source: job.source,
        postURL: job.postURL,
        hiringManagerProfileURL: job.hiringManagerProfileURL,
        sharedJobTitle: job.sharedJobTitle,
        sharedCompanyName: job.sharedCompanyName,
        sharedJobType: job.sharedJobType,
        recruiterProfileURL: job.recruiterProfileURL,
        sharedJobLocation: job.sharedJobLocation,
        shared_other_details: job.shared_other_details,
      }))
      .sort((a, b) => {
        const aTimestamp = a.posted_job_timestamp || a.shared_job_timestamp;
        const bTimestamp = b.posted_job_timestamp || b.shared_job_timestamp;
        return new Date(bTimestamp) - new Date(aTimestamp);
      });
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

    let job = await db
      .collection("job_posts")
      .findOne({ _id: ObjectId.createFromHexString(id) });
    console.log("posted job from db", job);

    if (!job) {
      job = await db
        .collection("job_shares")
        .findOne({ _id: ObjectId.createFromHexString(id) });
      console.log("shared job from db", job);
    }

    if (job) {
      job.isShared = true;
    }

    if (!job) {
      return null;
    }

    return {
      _id: job._id.toString(),
      title: job.title || null,
      description: job.description || null,
      location: job.location || null,
      salary: job.salary || null,
      type: job.type || null,
      companyName: job.companyName || null,
      applicationURL: job.applicationURL || null,
      timestamp: job.timestamp || job.shared_job_timestamp,
      isShared: job.isShared || false,
      source: job.source || null,
      postURL: job.postURL || null,
      recruiterProfileURL: job.recruiterProfileURL || null,
      hiringManagerProfileURL: job.hiringManagerProfileURL || null,
      sharedJobTitle: job.sharedJobTitle || null,
      sharedCompanyName: job.sharedCompanyName || null,
      sharedJobType: job.sharedJobType || null,
      sharedJobLocation: job.sharedJobLocation || null,
      shared_other_details: job.shared_other_details || null,
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

export async function createUser(user) {
  let client;
  try {
    client = await getClient();
    const db = client.db("job_board");
    const result = await db.collection("users").insertOne(user);
    return result;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function getUserByEmail(email) {
  let client;
  try {
    client = await getClient();
    const db = client.db("job_board");
    const user = await db.collection("users").findOne({ email });

    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
}
