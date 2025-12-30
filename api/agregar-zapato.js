import { Client } from 'pg';

const connectionString = 'postgresql://neondb_owner:npg_H6X4FlqKvxSj@ep-plain-brook-aem3qfgr-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 🔥 AQUÍ ESTÁ EL ARREGLO SSL
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const { nombre, precio, imagen, categoria } = req.body;

    await client.connect();
    
    const query = `
      INSERT INTO productos (nombre, precio, imagen, categoria, stock)
      VALUES ($1, $2, $3, $4, 10)
      RETURNING *;
    `;
    
    const result = await client.query(query, [nombre, precio, imagen, categoria]);
    
    await client.end();

    return res.status(200).json({ message: "Zapato guardado!", zapato: result.rows[0] });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}