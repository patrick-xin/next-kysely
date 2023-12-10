import { openai } from '@/lib/openai';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {

    const { message } = await req.json();
    const models = await openai.models.list()

    console.log(models);



    return NextResponse.json({ messages: 'hi' })
}
