import { MongoClient } from 'mongodb';

const handleNewsletter = async (req, res) => {
  if (req.method === 'POST') {
    const newsletterEmail = req.body.newsletter;

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      res.status(422).json({
        message: 'Invalid address',
      });
      return;
    }

    const client = await MongoClient.connect(
      'mongodb://127.0.0.1:27017/newsletter'
    );

    const db = client.db();
    await db.collection('emails').insertOne({ newsletter: newsletterEmail });
    client.close();

    res.status(201).json({
      message: 'Success',
    });
  }
};

export default handleNewsletter;
