const { Client } = require('pg');

// TU LINK EXACTO DE NEON:
const connectionString = 'postgresql://neondb_owner:npg_H6X4FlqKvxSj@ep-plain-brook-aem3qfgr-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

async function crearTodo() {
  try {
    console.log("🔌 Conectando a la base de datos...");
    await client.connect();

    // 1. CREAR LA TABLA
    console.log("🔨 Construyendo la tabla 'productos'...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        imagen TEXT,
        categoria VARCHAR(50),
        stock INT DEFAULT 10
      );
    `);

    // 2. METER LOS ZAPATOS
    console.log("👟 Metiendo los zapatos en la caja...");
    await client.query(`
      INSERT INTO productos (nombre, precio, imagen, categoria) VALUES
      ('Nike Air Jordan Retro', 179.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop', 'Hombres'),
      ('Adidas Yeezy Boost', 220.00, 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=600&auto=format&fit=crop', 'Hombres'),
      ('Puma RS-X', 110.00, 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop', 'Mujeres');
    `);

    console.log("✅ ¡LISTO! Todo configurado.");
    await client.end();

  } catch (err) {
    console.error("❌ Error:", err);
  }
}

crearTodo();