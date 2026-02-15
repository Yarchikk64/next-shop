import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';


const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { items, total, email, clerkId, customerName } = body;

    const order = await prisma.order.create({
      data: {
        total: parseFloat(total),
        items: items, 
        email: email,
        clerkId: clerkId, 
        customerName: customerName, 
        status: "Paid",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("ORDER_CREATE_ERROR:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message 
    }, { status: 500 });
  }
}