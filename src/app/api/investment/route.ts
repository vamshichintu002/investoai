import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const formDetails = await prisma.form_details.findFirst({
      select: {
        api_out_json: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!formDetails?.api_out_json) {
      return NextResponse.json({ error: 'No investment data found' }, { status: 404 });
    }

    return NextResponse.json(formDetails.api_out_json);
  } catch (error) {
    console.error('Error fetching investment data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
