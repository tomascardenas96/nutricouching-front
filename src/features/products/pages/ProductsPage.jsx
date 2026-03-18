import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CiSearch } from "react-icons/ci";
import { RiEqualizerLine } from "react-icons/ri";
import ProductCard from "../../../common/products-carousel/ProductCard";
import { useCartItems } from "../../cart/hooks/useCartItems";
import useAddItemToCart from "../../cart/hooks/useAddItemToCart";
import useGetAllProducts from "../hooks/useGetAllProducts";
import useHandleCarouselPages from "../hooks/useHandleCarouselPages";
import "./ProductsPage.css";

const ITEMS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: "default",    label: "Relevancia" },
  { value: "price-asc",  label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-az",    label: "Nombre: A → Z" },
];

const STOCK_OPTIONS = [
  { value: "all",      label: "Todos" },
  { value: "in-stock", label: "Con stock" },
  { value: "no-stock", label: "Sin stock" },
];

function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy]           = useState("default");
  const [stockFilter, setStockFilter] = useState("all");
  const [minPrice, setMinPrice]       = useState("");
  const [maxPrice, setMaxPrice]       = useState("");

  const { products, productsLoading, productsError } = useGetAllProducts();
  const { setElementsInCart } = useCartItems();
  const { addItemToCart } = useAddItemToCart("product", setElementsInCart);

  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (stockFilter === "in-stock") filtered = filtered.filter((p) => p.stock > 0);
  if (stockFilter === "no-stock") filtered = filtered.filter((p) => p.stock === 0);
  if (minPrice !== "") filtered = filtered.filter((p) => p.price >= Number(minPrice));
  if (maxPrice !== "") filtered = filtered.filter((p) => p.price <= Number(maxPrice));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc")  return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-az")    return a.name.localeCompare(b.name);
    return 0;
  });

  const { currentPage, setCurrentPage, currentProducts, nextPage, previousPage, totalPages } =
    useHandleCarouselPages(sorted, ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, sortBy, stockFilter, minPrice, maxPrice, setCurrentPage]);

  const hasActiveFilters = sortBy !== "default" || stockFilter !== "all" || minPrice !== "" || maxPrice !== "";

  const resetFilters = () => {
    setSearchQuery("");
    setSortBy("default");
    setStockFilter("all");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="products-page">
      <Helmet>
        <title>Productos | Cohesiva</title>
      </Helmet>

      <header className="products-page__header">
        <h1>Nuestros Productos</h1>
        {!productsLoading && !productsError && (
          <p className="products-page__count">{sorted.length} productos</p>
        )}
      </header>

      {/* Toolbar */}
      <div className="products-page__toolbar">
        {/* Row 1: search + sort */}
        <div className="products-page__toolbar-row">
          <div className="products-page__search">
            <CiSearch className="products-page__search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="products-page__sort-wrap">
            <label className="products-page__sort-label">Ordenar</label>
            <select
              className="products-page__sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: stock chips + price range + reset */}
        <div className="products-page__toolbar-row products-page__toolbar-row--filters">
          <div className="products-page__filter-group">
            <RiEqualizerLine className="products-page__filter-icon" />
            <div className="products-page__chip-group">
              {STOCK_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`products-page__chip${stockFilter === opt.value ? " active" : ""}`}
                  onClick={() => setStockFilter(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="products-page__divider" />

          <div className="products-page__price-group">
            <span className="products-page__price-label">Precio</span>
            <div className="products-page__price-range">
              <input
                type="number"
                min="0"
                placeholder="Mín."
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="products-page__price-input"
              />
              <span className="products-page__price-sep">—</span>
              <input
                type="number"
                min="0"
                placeholder="Máx."
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="products-page__price-input"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <button className="products-page__reset" onClick={resetFilters}>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {productsLoading && (
        <div className="products-page__grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="products-page__skeleton" />
          ))}
        </div>
      )}

      {productsError && (
        <p className="products-page__message">Error al cargar productos</p>
      )}

      {!productsLoading && !productsError && sorted.length === 0 && (
        <p className="products-page__message">
          No hay productos que coincidan con los filtros seleccionados
        </p>
      )}

      {!productsLoading && !productsError && currentProducts.length > 0 && (
        <div className="products-page__grid">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onAddToCart={addItemToCart}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="products-page__pagination">
          <button
            onClick={previousPage}
            disabled={currentPage === 0}
            className="products-page__pagination-arrow"
          >
            ←
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`products-page__pagination-btn${i === currentPage ? " active" : ""}`}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="products-page__pagination-arrow"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
