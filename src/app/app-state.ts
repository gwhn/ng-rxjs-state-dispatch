import {Todo} from "./todo";

export interface AppState {
    todos: Todo[];
    visibilityFilter: string;
    nextId: number;
}
