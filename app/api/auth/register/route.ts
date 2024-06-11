import { NextResponse } from "next/server";
import {hash} from "bcrypt"
import {sql} from '@vercel/postgres'

export  async function POST(request : Request) {
    try{
        const {email, password} = await request.json();
//validate TO DO

    const hashedPassword = await hash(password, 10);
    const response = await sql`
        insert into users (email, password)
        values (${email}, ${hashedPassword})
    `;   

    }catch(e){
        console.log({e})
    }

return NextResponse.json({message: 'succes'});
}