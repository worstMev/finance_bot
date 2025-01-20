import type { NextApiRequest, NextApiResponse } from 'next';

let messages: string[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    const { message } = req.body;
    if (message) {
      messages.push(message);
      res.status(201).json({ message: 'Message added' });
    } else {
      res.status(400).json({ error: 'Invalid message' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
