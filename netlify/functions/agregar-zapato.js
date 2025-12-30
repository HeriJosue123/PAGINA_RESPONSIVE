const { Client } = require('pg');

// ⚠️ IMPORTANTE: ¡COPIA AQUÍ EL MISMO LINK QUE TIENES EN api-zapatos.js!
const connectionString = 'postgresql://neondb_owner:npg_H6X4FlqKvxSj@ep-plain-brook-aem3qfgr-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

exports.handler = async (event, context) => {
  // Solo aceptamos envíos de datos (POST), no visitas normales
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const client = new Client({ connectionString });

  try {
    // 1. Leemos los datos que mandaste desde el formulario
    const datos = JSON.parse(event.body);
    const { nombre, precio, imagen, categoria } = datos;

    // 2. Conectamos
    await client.connect();

    // 3. ¡LA ORDEN SQL! (Guardar el zapato)
    const query = `
      INSERT INTO productos (nombre, precio, imagen, categoria, stock)
      VALUES ($1, $2, $3, $4, 10)
      RETURNING *;
    `;
    
    // Ejecutamos la orden
    const result = await client.query(query, [nombre, precio, imagen, categoria]);
    
    await client.end();

    // 4. Respondemos que todo salió bien
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Zapato guardado!", zapato: result.rows[0] })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};