import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    
    const { items, total, email, firstName, lastName, clerkId } = body;

    const order = await prisma.order.create({
      data: {
        total: parseFloat(total),
        items: items, 
        email: email || "guest@example.com",
        customerName: firstName ? `${firstName} ${lastName}` : (body.customerName || "Guest Customer"),
        clerkId: userId || clerkId || null,
        status: "Paid",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    console.error("ORDER_CREATE_ERROR:", error);
    
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: errorMessage 
    }, { status: 500 });
  }
}