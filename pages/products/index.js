import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Products() {
  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  if (error) {
    return <h1>ERROR</h1>;
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return data.map((product) => {
    return (
      <section key={product.id}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          {product.price} {product.currency}
        </p>
        <span>Category: {product.category}</span>
      </section>
    );
  });
}

// id: "2",
// name: "Anemonefish",
// description: "Nemo",
// price: 65,
// currency: "€",
// category: "Seawater",
