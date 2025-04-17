import { render, screen, fireEvent } from "@testing-library/react";
import { Mock } from "vitest";
import TaskForm from "../TaskForm";
import useTasksContext from "@hooks/useTasksContext";

vi.mock("@hooks/useTasksContext");

describe("TaskForm", () => {
    let mockDispatch: Mock;

    beforeEach(() => {
        mockDispatch = vi.fn();
        (useTasksContext as Mock).mockReturnValue({ dispatch: mockDispatch });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders input and button", () => {
        render(<TaskForm />);

        expect(screen.getByPlaceholderText("New task...")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    });

    it("updates input value on change", () => {
        render(<TaskForm />);

        const input = screen.getByPlaceholderText("New task...");
        fireEvent.change(input, { target: { value: "Test Task" } });

        expect((input as HTMLInputElement).value).toBe("Test Task");
    });

    it("dispatches ADD_TASK action on valid form submission", () => {
        render(<TaskForm />);

        const input = screen.getByPlaceholderText("New task...");
        const button = screen.getByRole("button", { name: /add/i });

        fireEvent.change(input, { target: { value: "Test Task" } });
        fireEvent.click(button);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: "ADD_TASK",
            payload: { title: "Test Task", completed: false },
        });
        expect((input as HTMLInputElement).value).toBe("");
    });

    it("does not dispatch ADD_TASK action on empty input", () => {
        render(<TaskForm />);

        const button = screen.getByRole("button", { name: /add/i });
        fireEvent.click(button);

        expect(mockDispatch).not.toHaveBeenCalled();
    });
});