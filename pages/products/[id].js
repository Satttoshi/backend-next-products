import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Products() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(`/api/products/${id}`, fetcher);

  if (error) {
    return <h1>ERROR</h1>;
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  const product = data;

  return (
    <section>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>
        {product.price} {product.currency}
      </p>
      <span>Category: {product.category}</span>
    </section>
  );
}
