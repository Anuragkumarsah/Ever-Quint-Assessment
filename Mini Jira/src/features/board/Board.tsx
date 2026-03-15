import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Task } from "../../types/tasks";
import { StatusTypes } from "../../types/status";
import { updateTaskStatus } from "../../store/taskSlice";
import { getFilteredAndSortedTasks } from "../../utils/taskSelectors";
import {
  parseFiltersFromURL,
  updateURLFromFilters,
} from "../../utils/filterQueryParams";
import {
  setStatusFilter,
  setPriorityFilter,
  setSearchText,
  setSortBy,
  clearFilters,
} from "../../store/filterSlice";
import TaskCard from "../../components/task/TaskCard";
import TaskModal from "../../components/task/TaskModal";
import Button from "../../components/ui/Button/Button";
import FilterPanel from "./FilterPanel";
import "./Board.css";

const COLUMNS: { id: StatusTypes; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const Board = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const filters = useAppSelector((state) => state.filters);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (Array.from(searchParams.keys()).length > 0) {
      setIsFilterOpen(true);
      const urlFilters = parseFiltersFromURL(searchParams);
      dispatch(setStatusFilter(urlFilters.status));
      dispatch(setPriorityFilter(urlFilters.priority || ""));
      dispatch(setSearchText(urlFilters.searchText));
      dispatch(setSortBy(urlFilters.sortBy));
    }
  }, []);

  useEffect(() => {
    const newParams = updateURLFromFilters(filters);
    setSearchParams(newParams, { replace: true });
  }, [filters, setSearchParams]);

  const filteredTasks = getFilteredAndSortedTasks(tasks, filters);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleStatusChange = (taskId: number, newStatus: StatusTypes) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  return (
    <div className="board-container">
      <header className="board-header">
        <h2 className="board-header__title">Team Workflow</h2>
        <div className="board-header__actions">
          {tasks.length > 0 && (
            <Button
              variant="secondary"
              onClick={() => {
                if (isFilterOpen) {
                  dispatch(clearFilters());
                  setIsFilterOpen(false);
                } else {
                  setIsFilterOpen(true);
                }
              }}
              className="board-filter-toggle"
              title={isFilterOpen ? "Close Filters" : "Open Filters"}
              aria-label={isFilterOpen ? "Close Filters" : "Open Filters"}
            >
              {isFilterOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </Button>
          )}
          <Button variant="primary" onClick={handleCreateTask}>
            Create Task
          </Button>
        </div>
      </header>

      {tasks.length > 0 && isFilterOpen && <FilterPanel />}

      {tasks.length === 0 ? (
        <div className="board-empty-state">
          <h3>No tasks yet</h3>
          <p>Create your first task to get started.</p>
          <Button variant="primary" onClick={handleCreateTask}>
            Create Task
          </Button>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="board-empty-state">
          <h3>No tasks match the current filters.</h3>
          <p>Try adjusting your search or clearing filters.</p>
        </div>
      ) : (
        <div className="board-columns">
          {COLUMNS.map((column) => {
            const columnTasks = filteredTasks.filter(
              (t) => t.status === column.id,
            );

            return (
              <div key={column.id} className="board-column">
                <div className="board-column__header">
                  <h3 className="board-column__title">{column.title}</h3>
                  <span className="board-column__count">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="board-column__content">
                  {columnTasks.length === 0 ? (
                    <div className="board-column__empty">
                      No tasks in this column.
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => handleEditTask(task)}
                        onStatusChange={handleStatusChange}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Board;
