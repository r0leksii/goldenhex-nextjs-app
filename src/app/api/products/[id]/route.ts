import { NextResponse } from "next/server";
import { getProductById } from "@/lib/actions/product.actions";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  if (!id || isNaN(parseInt(id, 10))) {
    return NextResponse.json(
      { ok: false, error: "Invalid or missing product id parameter" },
      { status: 400 }
    );
  }

  try {
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json(
        { ok: false, error: `Product not found for id ${id}` },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true, product }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Unknown error fetching product",
      },
      { status: 500 }
    );
  }
}
