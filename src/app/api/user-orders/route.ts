import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'; 
import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}