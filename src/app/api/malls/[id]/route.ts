import { NextRequest, NextResponse } from "next/server";
import Mall from "../db";

export async function GET(req: NextRequest, context: { params: any }) {
  try {
    let mallId = context.params["id"];

    let response = await Mall.findOne(mallId);

    return NextResponse.json(response);
  } catch (error) {
    let response = "error reason";

    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {}

export async function PUT(req: NextRequest, res: NextResponse) {}

export async function DELETE(req: NextRequest, res: NextResponse) {}
