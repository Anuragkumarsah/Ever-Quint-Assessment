// ChangeEvent removed
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setStatusFilter,
  setPriorityFilter,
  setSearchText,
  setSortBy,
  clearFilters,
  SortOption,
} from "../../store/filterSlice";
import TextInput from "../../components/ui/TextInput/TextInput";
import Select from "../../components/ui/Select/Select";
import MultiSelect from "../../components/ui/MultiSelect/MultiSelect";
import Button from "../../components/ui/Button/Button";
import { Priority, StatusTypes } from "../../types/status";
import "./FilterPanel.css";

const FilterPanel = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const handleStatusChange = (values: string[]) => {
    dispatch(setStatusFilter(values as StatusTypes[]));
  };

  const handlePriorityChange = (values: string[]) => {
    dispatch(setPriorityFilter(values as Priority[]));
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.priority.length > 0 ||
    filters.searchText !== "" ||
    filters.sortBy !== "createdAt";

  return (
    <div className="filter-panel">
      <div className="filter-panel__header">
        <h3 className="filter-panel__title">Filter & Sort</h3>
        {hasActiveFilters && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => dispatch(clearFilters())}
            className="filter-panel__clear-btn"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="filter-panel__controls">
        <div className="filter-panel__control-group filter-panel__search-group">
          <TextInput
            placeholder="Search titles and descriptions..."
            value={filters.searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
            aria-label="Search Tasks"
          />
        </div>

        <div className="filter-panel__control-group">
          <MultiSelect
            label="Status"
            value={filters.status}
            onChange={handleStatusChange}
            placeholder="All Statuses"
            options={[
              { label: "Backlog", value: "backlog" },
              { label: "In Progress", value: "inProgress" },
              { label: "Done", value: "done" },
            ]}
          />
        </div>

        <div className="filter-panel__control-group">
          <MultiSelect
            label="Priority"
            value={filters.priority}
            onChange={handlePriorityChange}
            placeholder="All Priorities"
            options={[
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
            ]}
          />
        </div>

        <div className="filter-panel__control-group">
          <Select
            label="Sort By"
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
            options={[
              { label: "Newest First", value: "createdAt" },
              { label: "Recently Updated", value: "updatedAt" },
              { label: "Highest Priority", value: "priority" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
