import React, { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar/index.js";
import PreventiveList from "../components/PreventiveList/index.js";
import { PREVENTIVE_FILTERS_CONFIG } from "../constants/index.js";
import { useAppState } from "../state/stateContext.js";
import applyFilters from "../utils/apply-filters.js";

function PreventiveArchive() {
  const { preventives, loadingPreventives } = useAppState();
  const [filters, setFilters] = useState({});

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const search = filters.search || "";

  const filteredItems = useMemo(() => {
    if (loadingPreventives || preventives.length === 0) {
      return [];
    }
    return applyFilters(preventives, filters);
  }, [loadingPreventives, preventives, filters]); // Add loading as a dependency

  if (loadingPreventives) {
    return "Loading";
  }

  return (
    <div id="PreventiveArchivePage" className="preventive-archive-page-container">
      {/* Intro heading */}
      <div>
        <h1>Preventives Archive</h1>
        <section>
          <p>
            Welcome to the Preventives Archive, your digital hub for preventive
            maintenance plans and services. Explore a variety of options
            tailored for different needs, enhanced by an intuitive interface and
            advanced filtering capabilities to quickly find what you're
            searching for.
          </p>
        </section>

        <section>
          <h2>Filters Overview</h2>
          <p>
            Our dynamic filtering system simplifies finding the ideal preventive
            plan:
          </p>
          <ul>
            <li>
              <strong>Keyword Search:</strong> Quickly find preventives by ID,
              title, or description. The default case-insensitive search
              broadens your query scope.
            </li>
            <li>
              <strong>Category Filter:</strong> Narrow your search with category
              selections, from "All Categories" to specific ones like "Category
              1" and "Category 2".
            </li>
          </ul>
        </section>

        <section>
          <h2>Usage Guide</h2>
          <p>Getting started:</p>
          <ol>
            <li>
              Use <em>Search</em> to find preventives by keywords.
            </li>
            <li>
              Choose a <em>Category</em> to filter results more specifically.
            </li>
            <li>
              Access <em>PDF</em> documentation for in-depth details of each
              plan.
            </li>
            <li>
              Explore <em>View</em> and <em>Edit</em> options for further
              actions.
            </li>
          </ol>
          <p>
            The Preventives Archive aims to streamline the management and
            discovery of preventive plans for efficient maintenance planning.
          </p>
        </section>
      </div>

      <FilterBar
        filtersConfig={PREVENTIVE_FILTERS_CONFIG}
        caseSensitive={false}
        onFilterChange={handleFilterChange}
      />
      <PreventiveList preventives={filteredItems} search={search} />
    </div>
  );
}

export default PreventiveArchive;
