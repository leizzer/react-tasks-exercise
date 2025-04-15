import React from "react";
import FilterButton from "@components/shared/FlatButton";
import { TasksFilters } from "@customTypes/taskTypes";

interface FilterProps {
    currentFilter: TasksFilters;
    onFilterSelected: (filter: TasksFilters) => void;
};

const Filter: React.FC<FilterProps> = ({ onFilterSelected, currentFilter }) => {
    return (
        <div className="inline-flex w-full justify-center">
            <FilterButton onClick={() => onFilterSelected(TasksFilters.ALL)} label="All" isActive={currentFilter == TasksFilters.ALL} />
            <FilterButton onClick={() => onFilterSelected(TasksFilters.COMPLETED)} label="Completed" isActive={currentFilter == TasksFilters.COMPLETED} />
            <FilterButton onClick={() => onFilterSelected(TasksFilters.PENDING)} label="Pending" isActive={currentFilter == TasksFilters.PENDING} />
        </div>
    );
}

export default Filter;