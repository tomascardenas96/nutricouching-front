import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CiSearch } from "react-icons/ci";
import { RiEqualizerLine } from "react-icons/ri";
import ProductCard from "../../../common/products-carousel/ProductCard";
import { useCartItems } from "../../cart/hooks/useCartItems";
import useAddItemToCart from "../../cart/hooks/useAddItemToCart";
import useGetAllViands from "../hooks/useGetAllViands";
import useHandleCarouselPages from "../../products/hooks/useHandleCarouselPages";
import "./ViandsPage.css";

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

function ViandsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy]           = useState("default");
  const [stockFilter, setStockFilter] = useState("all");
  const [minPrice, setMinPrice]       = useState("");
  const [maxPrice, setMaxPrice]       = useState("");

  const { viands, viandsLoading, viandsError } = useGetAllViands();
  const { setElementsInCart } = useCartItems();
  const { addItemToCart } = useAddItemToCart("viand", setElementsInCart);

  let filtered = viands.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (stockFilter === "in-stock") filtered = filtered.filter((v) => v.stock > 0);
  if (stockFilter === "no-stock") filtered = filtered.filter((v) => v.stock === 0);
  if (minPrice !== "") filtered = filtered.filter((v) => v.price >= Number(minPrice));
  if (maxPrice !== "") filtered = filtered.filter((v) => v.price <= Number(maxPrice));

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
    <div className="viands-page">
      <Helmet>
        <title>Viandas | Cohesiva</title>
      </Helmet>

      <header className="viands-page__header">
        <h1>Nuestras Viandas</h1>
        {!viandsLoading && !viandsError && (
          <p className="viands-page__count">{sorted.length} viandas</p>
        )}
      </header>

      {/* Toolbar */}
      <div className="viands-page__toolbar">
        {/* Row 1: search + sort */}
        <div className="viands-page__toolbar-row">
          <div className="viands-page__search">
            <CiSearch className="viands-page__search-icon" />
            <input
              type="text"
              placeholder="Buscar viandas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="viands-page__sort-wrap">
            <label className="viands-page__sort-label">Ordenar</label>
            <select
              className="viands-page__sort"
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
        <div className="viands-page__toolbar-row viands-page__toolbar-row--filters">
          <div className="viands-page__filter-group">
            <RiEqualizerLine className="viands-page__filter-icon" />
            <div className="viands-page__chip-group">
              {STOCK_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`viands-page__chip${stockFilter === opt.value ? " active" : ""}`}
                  onClick={() => setStockFilter(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="viands-page__divider" />

          <div className="viands-page__price-group">
            <span className="viands-page__price-label">Precio</span>
            <div className="viands-page__price-range">
              <input
                type="number"
                min="0"
                placeholder="Mín."
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="viands-page__price-input"
              />
              <span className="viands-page__price-sep">—</span>
              <input
                type="number"
                min="0"
                placeholder="Máx."
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="viands-page__price-input"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <button className="viands-page__reset" onClick={resetFilters}>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {viandsLoading && (
        <div className="viands-page__grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="viands-page__skeleton" />
          ))}
        </div>
      )}

      {viandsError && (
        <p className="viands-page__message">Error al cargar viandas</p>
      )}

      {!viandsLoading && !viandsError && sorted.length === 0 && (
        <p className="viands-page__message">
          No hay viandas que coincidan con los filtros seleccionados
        </p>
      )}

      {!viandsLoading && !viandsError && currentProducts.length > 0 && (
        <div className="viands-page__grid">
          {currentProducts.map((viand) => (
            <ProductCard
              key={viand.viandId}
              product={viand}
              onAddToCart={addItemToCart}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="viands-page__pagination">
          <button
            onClick={previousPage}
            disabled={currentPage === 0}
            className="viands-page__pagination-arrow"
          >
            ←
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`viands-page__pagination-btn${i === currentPage ? " active" : ""}`}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="viands-page__pagination-arrow"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default ViandsPage;
