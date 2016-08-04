import {ToggleTodoActionType} from "./toggle-todo-action-type";
import {AddTodoActionType} from "./add-todo-action-type";
import {SetVisibilityFilterActionType} from "./set-visibility-filter-action-type";

export type TodoActionType = AddTodoActionType | ToggleTodoActionType;
export type FilterActionType = SetVisibilityFilterActionType;
export type ActionType = TodoActionType | FilterActionType;
