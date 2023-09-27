import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    let response = {
      page: 0,
      results: [],
    };

    return NextResponse.json(response);
  } catch (error) {
    let response = "error reason";

    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {}

export async function PUT(req: NextRequest, res: NextResponse) {}

export async function DELETE(req: NextRequest, res: NextResponse) {}
