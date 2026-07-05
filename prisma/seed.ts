import { db } from "../lib/db"

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: 'Computer Science' },
        { name: 'Music' },
        { name: 'Fitness' },
        { name: 'Photography' },
        { name: 'Accounting' },
        { name: 'Engineering' },
        { name: 'Filming' },
      ],
    })

    console.log('🟢 Seed script run successfully!🟢')
  } catch (error) {
    console.log('🔴 Error in seed script 🔴', error)
  } finally {
    await db.$disconnect()
  }
}

main()
