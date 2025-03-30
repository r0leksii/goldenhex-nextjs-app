//@refresh

import HomeThreeMain from "@/components/home-three/HomeThreeMain";
import Wrapper from "@/layout/DefaultWrapper";
import ShopMain from "@/components/shop/ShopMain";
import { getProducts } from "@/lib/actions/product.actions";
import { Suspense } from "react";

const Home = async () => {
  const initialData = await getProducts();

  return (
    <>
      <Wrapper>
        <main>
          {/* <HomeThreeMain /> */}
          <Suspense fallback={<div>Loading...</div>}>
            <ShopMain initialData={initialData} />
          </Suspense>
        </main>
      </Wrapper>
    </>
  );
};

export default Home;
