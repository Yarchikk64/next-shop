import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, total, email } = body;

    const order = await prisma.order.create({
      data: {
        total: parseFloat(total),
        items: items,
        email: email,
        status: "Paid",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("ORDER_CREATE_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}