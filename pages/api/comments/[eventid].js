import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  const eventId = req.query.eventid;

  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017/newsletter'
  );

  if (req.method === 'POST') {
    // const filePath = path.join(process.cwd(), 'data', 'comment.json');
    // const readFilePath = fs.readFileSync(filePath)
    const { name, email, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({
        message: 'Invalid input data',
      });
      return;
    }

    const newComment = {
      name,
      email,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);

    console.log(result);
    newComment.id = result.insertedId;

    res.status(201).json({
      message: `The message sent`,
      comment: newComment,
    });
  }

  if (req.method === 'GET') {
    const db = client.db();
    const getAll = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(201).json({ comments: getAll });
  }

  client.close();
};

export default handler;
