import { describe, it, expect } from "vitest";
import todoReducer, {toggleTodo, deleteTodo, setFilter, clearError}  from "./todoSlice";
describe("todoSlice", () => {
    it("should handle initial state", () => {
        const initialState = {
        items: [],
        loading: false,
        error: null,
        filter: "all"
        };
        const state = todoReducer(undefined, { type: "unknown" });
        expect(state).toEqual(initialState);
    });
    
    it("should handle toggleTodo", () => {
        const initialState = {
        items: [{ id: 1, text: "Test Todo", completed: false }],
        loading: false,
        error: null,
        filter: "all"
        };
        const state = todoReducer(initialState, toggleTodo(1));
        expect(state.items[0].completed).toBe(true);
    });
    
    it("should handle deleteTodo", () => {
        const initialState = {
        items: [{ id: 1, text: "Test Todo", completed: false }],
        loading: false,
        error: null,
        filter: "all"
        };
        const state = todoReducer(initialState, deleteTodo(1));
        expect(state.items).toHaveLength(0);
    });
    
    it("should handle setFilter", () => {
        const initialState = {
        items: [],
        loading: false,
        error: null,
        filter: "all"
        };
        const state = todoReducer(initialState, setFilter("completed"));
        expect(state.filter).toBe("completed");
    });
    
    it("should handle clearError", () => {
        const initialState = {
        items: [],
        loading: false,
        error: "Some error",
        filter: "all"
        };
        const state = todoReducer(initialState, clearError());
        expect(state.error).toBeNull();
    });
    });