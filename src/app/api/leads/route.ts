import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const leadSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email format"),
  phone: z.string().regex(/^\+?1?\s*\(?-*\.*(\d{3})\)?\.*-*\s*(\d{3})\.*-*\s*(\d{4})$/, "Invalid US phone number"),
  zip_code: z.string().regex(/^\d{5}$/, "ZIP code must be 5 digits"),
  car_year: z.number().int(),
  car_make: z.string().min(1),
  car_model: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    const isValidVehicle = await prisma.vehicle.findFirst({
      where: {
        year: validatedData.car_year,
        make: validatedData.car_make,
        model: validatedData.car_model,
      },
    });

    if (!isValidVehicle) {
      return NextResponse.json(
        { error: 'Invalid vehicle combination selected' },
        { status: 400 }
      );
    }

    const newLead = await prisma.lead.create({
      data: validatedData,
    });

    return NextResponse.json({ success: true, id: newLead.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
