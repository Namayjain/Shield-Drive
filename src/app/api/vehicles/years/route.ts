import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const years = await prisma.vehicle.findMany({
      select: {
        year: true,
      },
      distinct: ['year'],
      orderBy: {
        year: 'desc',
      },
    });

    return NextResponse.json(years.map(v => v.year));
  } catch (error) {
    console.error('Error fetching vehicle years:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicle years' }, { status: 500 });
  }
}
