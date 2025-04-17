import { render, screen, fireEvent } from "@testing-library/react";
import { Mock } from "vitest";
import TaskItem from "../TaskItem";
import useTasksContext from "@hooks/useTasksContext";
import type { Task } from "@customTypes/taskTypes";

vi.mock("@hooks/useTasksContext");

describe("TaskItem Component", () => {
    const mockDispatch = vi.fn();
    const mockTask: Task = {
        id: 1,
        title: "Test Task",
        completed: false,
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useTasksContext as Mock).mockReturnValue({ dispatch: mockDispatch });
    });

    it("renders the task title", () => {
        render(<TaskItem task={mockTask} />);
        expect(screen.getByText("Test Task")).toBeInTheDocument();
    });

    it("applies the correct styles for an incomplete task", () => {
        render(<TaskItem task={mockTask} />);
        const taskTitle = screen.getByText("Test Task");
        expect(taskTitle).not.toHaveClass("line-through");
        expect(taskTitle).toHaveClass("text-black");
    });

    it("applies the correct styles for a completed task", () => {
        render(<TaskItem task={{ ...mockTask, completed: true }} />);
        const taskTitle = screen.getByText("Test Task");
        expect(taskTitle).toHaveClass("line-through");
        expect(taskTitle).toHaveClass("text-green-500");
    });

    it("calls dispatch with TOGGLE_TASK when the task title is clicked", () => {
        render(<TaskItem task={mockTask} />);
        const taskTitle = screen.getByText("Test Task");
        fireEvent.click(taskTitle);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "TOGGLE_TASK",
            payload: mockTask,
        });
    });

    it("shows a confirmation dialog and calls dispatch with DELETE_TASK when delete button is clicked", () => {
        vi.spyOn(window, "confirm").mockReturnValue(true);
        render(<TaskItem task={mockTask} />);
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);
        expect(window.confirm).toHaveBeenCalledWith(`Delete task? \n "Test Task"?`);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "DELETE_TASK",
            payload: mockTask,
        });
    });

    it("does not call dispatch if delete is canceled", () => {
        vi.spyOn(window, "confirm").mockReturnValue(false);
        render(<TaskItem task={mockTask} />);
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);
        expect(window.confirm).toHaveBeenCalledWith(`Delete task? \n "Test Task"?`);
        expect(mockDispatch).not.toHaveBeenCalled();
    });
});