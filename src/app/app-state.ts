import {Todo} from "./todo";

export interface Filters {
    visibility: string;
    sortOrder: string;
}

export interface AppState {
    todos: Todo[];
    filters: Filters
}
