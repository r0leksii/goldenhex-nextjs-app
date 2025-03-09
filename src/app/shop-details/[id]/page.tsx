import { Suspense } from "react";
import ShopDetailsMain from "@/components/shop-details/ShopDetailsMain";
import { getProductById } from "@/lib/actions";
import { notFound } from "next/navigation";
import Wrapper from "@/layout/DefaultWrapper";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ShopDetailsPage({ params }: PageProps) {
  const product = await getProductById(params.id);

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
