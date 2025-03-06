import BlogDetailsMain from "@/components/blog-details/BlogDetailsMain";
import Wrapper from "@/layout/DefaultWrapper";

interface PageProps {
  params: { id: number };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  return (
    <Wrapper>
      <main>
        <BlogDetailsMain id={id} />
      </main>
    </Wrapper>
  );
}
