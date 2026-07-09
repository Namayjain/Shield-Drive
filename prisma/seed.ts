import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with vehicle data...')

  const makesAndModels = {
    'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
    'Ford': ['F-150', 'Escape', 'Explorer', 'Mustang', 'Edge'],
    'Chevrolet': ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Traverse'],
    'Nissan': ['Rogue', 'Altima', 'Sentra', 'Pathfinder', 'Frontier'],
    'Jeep': ['Grand Cherokee', 'Wrangler', 'Cherokee', 'Compass', 'Renegade'],
    'Subaru': ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Legacy'],
    'Hyundai': ['Tucson', 'Elantra', 'Santa Fe', 'Sonata', 'Kona'],
    'Kia': ['Sportage', 'Forte', 'Sorento', 'Optima', 'Telluride'],
    'Ram': ['1500', '2500', '3500'],
    'GMC': ['Sierra', 'Terrain', 'Acadia', 'Yukon'],
    'Volkswagen': ['Jetta', 'Tiguan', 'Passat', 'Atlas', 'Golf'],
    'BMW': ['3 Series', 'X3', 'X5', '5 Series', '4 Series'],
    'Mercedes-Benz': ['C-Class', 'GLC', 'E-Class', 'GLE', 'S-Class'],
    'Lexus': ['RX', 'ES', 'NX', 'IS', 'GX'],
    'Mazda': ['CX-5', 'Mazda3', 'CX-9', 'Mazda6', 'CX-30'],
    'Audi': ['Q5', 'A4', 'Q7', 'A5', 'Q3'],
    'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X']
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i)

  const vehiclesData = [];

  for (const year of years) {
    for (const [make, models] of Object.entries(makesAndModels)) {
      for (const model of models) {
        vehiclesData.push({
          year,
          make,
          model,
        })
      }
    }
  }

  // Use createMany for bulk insertion to avoid making 1200 roundtrips to the DB.
  const result = await prisma.vehicle.createMany({
    data: vehiclesData,
    skipDuplicates: true,
  })

  console.log(`Seeded ${result.count} new vehicles successfully.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
