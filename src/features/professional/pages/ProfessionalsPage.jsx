import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import apiClient from "../../auth/api/apiClient";
import useHandleCarouselPages from "../../products/hooks/useHandleCarouselPages";
import useGetAllSpecialties from "../../specialties/hooks/useGetAllSpecialties";
import ProfessionalFilterResultCard from "../components/filter/ProfessionalFilterResultCard";
import "./ProfessionalsPage.css";

const ITEMS_PER_PAGE = 12;

function ProfessionalsPage() {
  const location = useLocation();

  const initialParams = new URLSearchParams(location.search);
  const [nameQuery, setNameQuery] = useState(initialParams.get("name") || "");
  const [debouncedName, setDebouncedName] = useState(nameQuery);
  const [categoryFromUrl] = useState(initialParams.get("category") || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedName(nameQuery), 400);
    return () => clearTimeout(t);
  }, [nameQuery]);

  // Specialties (with category info) for populating dropdowns
  const { specialties, loadingSpecialties } = useGetAllSpecialties();

  const allCategories = useMemo(() => {
    const seen = new Set();
    const result = [];
    specialties.forEach((s) => {
      const cat = s.category;
      if (cat && !seen.has(cat.categoryId)) {
        seen.add(cat.categoryId);
        result.push(cat);
      }
    });
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [specialties]);

  const availableSpecialties = useMemo(() => {
    const filtered = selectedCategory
      ? specialties.filter((s) => s.category?.categoryId === selectedCategory)
      : specialties;
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [specialties, selectedCategory]);

  // Resolve category name from URL to categoryId once categories load
  useEffect(() => {
    if (categoryFromUrl && allCategories.length > 0 && !selectedCategory) {
      const match = allCategories.find(
        (cat) => cat.name.toLowerCase() === categoryFromUrl.toLowerCase(),
      );
      if (match) setSelectedCategory(match.categoryId);
    }
  }, [categoryFromUrl, allCategories, selectedCategory]);

  // Reset specialty when category changes
  useEffect(() => {
    setSelectedSpecialty("");
  }, [selectedCategory]);

  // Fetch professionals using the filter endpoint
  const {
    data: professionals = [],
    isLoading: professionalsLoading,
    isError: professionalsError,
  } = useQuery({
    queryKey: [
      "professionals-filter",
      debouncedName,
      selectedSpecialty,
      selectedCategory,
    ],
    queryFn: () => {
      const params = new URLSearchParams();
      if (debouncedName) params.set("name", debouncedName);
      if (selectedSpecialty) params.set("specialty", selectedSpecialty);
      if (selectedCategory) params.set("category", selectedCategory);
      const qs = params.toString();
      const url = qs ? `/professional/filter?${qs}` : "/professional";
      return apiClient.get(url).then((r) => r.data);
    },
  });

  const {
    currentPage,
    setCurrentPage,
    currentProducts,
    nextPage,
    previousPage,
    totalPages,
  } = useHandleCarouselPages(professionals, ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedName, selectedCategory, selectedSpecialty, setCurrentPage]);

  const activeFiltersCount = [
    nameQuery,
    selectedCategory,
    selectedSpecialty,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setNameQuery("");
    setSelectedCategory("");
    setSelectedSpecialty("");
  };

  return (
    <div className="professionals-page">
      <Helmet>
        <title>Profesionales | Cohesiva</title>
      </Helmet>

      <header className="professionals-page__header">
        <h1>Nuestros Profesionales</h1>
        {!professionalsLoading && !professionalsError && (
          <p className="professionals-page__count">
            {professionals.length}{" "}
            {professionals.length === 1 ? "profesional" : "profesionales"}
          </p>
        )}
      </header>

      {/* Filter bar */}
      <div className="professionals-page__filters">
        <div className="professionals-page__search">
          <CiSearch className="professionals-page__search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
          {nameQuery && (
            <button
              className="professionals-page__input-clear"
              onClick={() => setNameQuery("")}
              aria-label="Limpiar búsqueda"
            >
              <IoClose />
            </button>
          )}
        </div>

        <div className="professionals-page__selects">
          <div className="professionals-page__select-wrap">
            <select
              className="professionals-page__select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={loadingSpecialties || allCategories.length === 0}
            >
              <option value="">Todas las categorías</option>
              {allCategories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="professionals-page__select-wrap">
            <select
              className="professionals-page__select"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              disabled={loadingSpecialties || availableSpecialties.length === 0}
            >
              <option value="">Todas las especialidades</option>
              {availableSpecialties.map((s) => (
                <option key={s.specialtyId} value={s.specialtyId}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {activeFiltersCount > 0 && (
            <button
              className="professionals-page__clear-btn"
              onClick={clearAllFilters}
            >
              <IoClose />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {professionalsLoading && (
        <div className="professionals-page__grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="professionals-page__skeleton" />
          ))}
        </div>
      )}

      {professionalsError && (
        <p className="professionals-page__message">
          Error al cargar profesionales
        </p>
      )}

      {!professionalsLoading &&
        !professionalsError &&
        professionals.length === 0 && (
          <p className="professionals-page__message">
            No hay profesionales que coincidan con los filtros seleccionados
          </p>
        )}

      {!professionalsLoading &&
        !professionalsError &&
        currentProducts.length > 0 && (
          <div className="professionals-page__grid">
            {currentProducts.map((professional) => (
              <Link
                key={professional.professionalId}
                to={`/profile/${professional.profile.profileName}`}
                className="professionals-page__card-link"
              >
                <ProfessionalFilterResultCard
                  fullname={professional.fullname}
                  image={professional.profile.picture}
                  specialties={professional.specialty}
                />
              </Link>
            ))}
          </div>
        )}

      {totalPages > 1 && (
        <div className="professionals-page__pagination">
          <button
            onClick={previousPage}
            disabled={currentPage === 0}
            className="professionals-page__pagination-arrow"
          >
            ←
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`professionals-page__pagination-btn${i === currentPage ? " active" : ""}`}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="professionals-page__pagination-arrow"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfessionalsPage;
