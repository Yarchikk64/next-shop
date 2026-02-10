import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export async function GET() {
  try {
    const newOrder = await prisma.order.create({
      data: {
        total: 99.99,
        items: { product: "Test Phone", quantity: 1 },
        email: "test@example.com",
        status: "Paid",
      },
    });

    return NextResponse.json({ message: "Наконец-то!", order: newOrder });
  } catch (error: any) {
    console.error("DETAILED ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}