import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get('year');

    if (!yearParam) {
      return NextResponse.json({ error: 'Year is required' }, { status: 400 });
    }

    const year = parseInt(yearParam, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear + 1) {
      return NextResponse.json({ error: 'Invalid year range' }, { status: 400 });
    }

    const makes = await prisma.vehicle.findMany({
      where: {
        year: year,
      },
      select: {
        make: true,
      },
      distinct: ['make'],
      orderBy: {
        make: 'asc',
      },
    });

    return NextResponse.json(makes.map((v) => v.make));
  } catch (error) {
    console.error('Error fetching vehicle makes:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicle makes' }, { status: 500 });
  }
}
