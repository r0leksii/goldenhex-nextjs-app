//@refresh

import HomeThreeMain from "@/components/home-three/HomeThreeMain";
import Wrapper from "@/layout/DefaultWrapper";
import ShopMain from "@/components/shop/ShopMain";
const Home = () => {
  return (
    <>
      <Wrapper>
        <main>
          {/* <HomeThreeMain /> */}
          <ShopMain />
        </main>
      </Wrapper>
    </>
  );
};

export default Home;
