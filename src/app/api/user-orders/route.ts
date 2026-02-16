import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'; 
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
   const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        clerkId: userId,
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("FETCH_ORDERS_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: (error as Error).message }, 
      { status: 500 }
    );
  }
}