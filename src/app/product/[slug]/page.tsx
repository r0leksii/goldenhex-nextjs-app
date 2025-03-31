export const runtime = "edge";

import { Suspense } from "react";
import ShopDetailsMain from "@/components/shop-details/ShopDetailsMain";
import { getProductById } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import Wrapper from "@/layout/DefaultWrapper";

interface PageProps {
  params: {
    slug: string;
  };
}

function extractIdFromSlug(slug: string): string | null {
  // 1. Handle empty input:
  if (!slug) return null;

  // 2. Split the slug string:
  const parts = slug.split("-");

  // 3. Get the last part:
  const potentialId = parts[parts.length - 1];

  // 4. Validate and return the ID:
  if (potentialId && /^\d+$/.test(potentialId)) {
    return potentialId;
  }

  // 5. Return null if ID not found or invalid:
  return null;
}

export default async function ShopDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const productId = extractIdFromSlug(slug);

  if (!productId) {
    console.warn(`Could not extract product ID from slug: ${slug}`);
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <Wrapper>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <ShopDetailsMain product={product} />
        </Suspense>
      </main>
    </Wrapper>
  );
}
