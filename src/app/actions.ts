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

export class LogAction {
    constructor(public message: string) {
    }
}

export type TodoAction = AddTodoAction | ToggleTodoAction;
export type FilterAction = SetVisibilityFilterAction | SetSortOrderAction;
export type Action = TodoAction | FilterAction | LogAction;
