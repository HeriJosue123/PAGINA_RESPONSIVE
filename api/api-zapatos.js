const { Client } = require('pg');

// ⚠️ PEGA AQUÍ TU LINK (El mismo que usaste en probar-db.js)
const connectionString = 'postgresql://neondb_owner:npg_H6X4FlqKvxSj@ep-plain-brook-aem3qfgr-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

exports.handler = async (event, context) => {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    // Pedimos los zapatos a la base de datos
    const result = await client.query('SELECT * FROM productos');
    await client.end();

    // Devolvemos los zapatos en formato JSON (para que el HTML los entienda)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Permite que cualquiera lea los datos
      },
      body: JSON.stringify(result.rows)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};