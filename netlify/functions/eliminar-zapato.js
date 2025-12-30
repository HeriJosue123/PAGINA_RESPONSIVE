const { Client } = require('pg');

// ⚠️ PEGA AQUÍ TU LINK DE CONEXIÓN (El mismo de siempre)
const connectionString = 'postgresql://neondb_owner:npg_H6X4FlqKvxSj@ep-plain-brook-aem3qfgr-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

exports.handler = async (event, context) => {
  // Solo aceptamos peticiones DELETE o POST
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const client = new Client({ connectionString });

  try {
    const { id } = JSON.parse(event.body);

    await client.connect();

    // LA ORDEN DE DESTRUCCIÓN 🗑️
    const query = 'DELETE FROM productos WHERE id = $1 RETURNING *';
    const result = await client.query(query, [id]);
    
    await client.end();

    if (result.rowCount === 0) {
      return { statusCode: 404, body: JSON.stringify({ message: "No se encontró ese zapato" }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Zapato eliminado correctamente", eliminado: result.rows[0] })
    };

  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};