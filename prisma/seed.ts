import { PrismaClient, rol_usuario } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando siembra de datos (Seed)...');

  const correoAdmin = 'admin@narubi.com';
  const existeAdmin = await prisma.usuario.findUnique({
    where: { correo_electronico: correoAdmin },
  });

  if (!existeAdmin) {
    const passwordHash = await bcrypt.hash('Admin123!', 10);

    const admin = await prisma.usuario.create({
      data: {
        nombre_completo: 'Administrador Narubi',
        correo_electronico: correoAdmin,
        password_hash: passwordHash,
        rol: rol_usuario.ADMINISTRADOR,
        activo: true,
      },
    });

    console.log('✅ Usuario Administrador inicial creado exitosamente en PostgreSQL:');
    console.log(`   - Correo: ${admin.correo_electronico}`);
    console.log(`   - Rol: ${admin.rol}`);
  } else {
    console.log('ℹ️ El usuario Administrador ya existe en la base de datos.');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
