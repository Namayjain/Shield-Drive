import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get('year');
    const make = searchParams.get('make');

    if (!yearParam || !make) {
      return NextResponse.json({ error: 'Year and make are required' }, { status: 400 });
    }

    const year = parseInt(yearParam, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear + 1) {
      return NextResponse.json({ error: 'Invalid year range' }, { status: 400 });
    }

    const models = await prisma.vehicle.findMany({
      where: {
        year: year,
        make: make,
      },
      select: {
        model: true,
      },
      distinct: ['model'],
      orderBy: {
        model: 'asc',
      },
    });

    return NextResponse.json(models.map((v) => v.model));
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicle models' }, { status: 500 });
  }
}
