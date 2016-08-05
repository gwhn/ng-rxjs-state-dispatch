export class AddTodoAction {
    constructor(public text: string) {
    }
}

export class SetVisibilityFilterAction {
    constructor(public type: string) {
    }
}

export class ToggleTodoAction {
    constructor(public id: number) {
    }
}

export type TodoAction = AddTodoAction | ToggleTodoAction;
export type FilterAction = SetVisibilityFilterAction;
export type Action = TodoAction | FilterAction;
