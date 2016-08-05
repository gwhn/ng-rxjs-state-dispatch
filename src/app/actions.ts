import {Inject} from "@angular/core";
import {Dispatch} from "./state-fn";
import {Observer} from "rxjs/Rx";

export class AddTodoAction {
    constructor(public text: string) {
    }
}

export class ToggleTodoAction {
    constructor(public id: number) {
    }
}

export class SetVisibilityFilterAction {
    constructor(public type: string) {
    }
}

export class SetSortOrderAction {
    constructor(public direction: string) {
    }
}

export type TodoAction = AddTodoAction | ToggleTodoAction;
export type FilterAction = SetVisibilityFilterAction | SetSortOrderAction;
export type Action = TodoAction | FilterAction;
