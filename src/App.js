import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  const fetchProduct = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) setProducts(data.products);
  };
  console.log(products);

  useEffect(() => {
    fetchProduct();
  }, []);
  const onSelectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== pages
    )
      setPages(selectedPage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(pages * 10 - 10, pages * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={pages > 1 ? "" : "pagination__disable"}
            onClick={() => onSelectPageHandler(pages - 1)}
          >
            ◀{" "}
          </span>
          {[...Array(products.length / 10)].map((_, id) => {
            return (
              <span
                className={pages === id + 1 ? "pagination__selected" : ""}
                onClick={() => onSelectPageHandler(id + 1)}
                key={id}
              >
                {id + 1}
              </span>
            );
          })}
          <span
            className={
              pages < products.length / 10 ? "" : "pagination__disable"
            }
            onClick={() => onSelectPageHandler(pages + 1)}
          >
            ▶{" "}
          </span>
        </div>
      )}
    </div>
  );
}
