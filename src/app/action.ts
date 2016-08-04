import {ToggleTodo} from "./toggle-todo";
import {AddTodo} from "./add-todo";
import {SetVisibilityFilter} from "./set-visibility-filter";

export type TodoAction = AddTodo | ToggleTodo;
export type FilterAction = SetVisibilityFilter;
export type Action = TodoAction | FilterAction;
