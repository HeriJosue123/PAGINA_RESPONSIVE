const { Client } = require('pg');

// TU LINK DE CONEXIÓN REAL:
const connectionString = 'postgresql://neondb_owner:npg_H6X4FlqKvxSj@ep-plain-brook-aem3qfgr-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

async function probarConexion() {
  try {
    console.log("🔌 Conectando a Neon...");
    await client.connect();
    console.log("✅ ¡Conexión Exitosa!");

    console.log("📦 Buscando productos en la nube...");
    // Consultamos la tabla que creamos en el paso anterior
    const res = await client.query('SELECT * FROM productos');
    
    console.log("\n👟 RESULTADO (Tus zapatos en la base de datos):");
    console.table(res.rows); // Muestra los datos en forma de tabla

    await client.end();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

probarConexion();