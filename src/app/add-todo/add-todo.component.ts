import {Component, Inject} from '@angular/core';
import {AddTodoActionType} from "../add-todo-action-type";
import {Dispatch} from "../state-fn";
import {Observer} from "rxjs/Rx";
import {ActionType} from "../action-types";

@Component({
    moduleId: module.id,
    selector: 'add-todo',
    templateUrl: 'add-todo.component.html',
    styleUrls: ['add-todo.component.css']
})
export class AddTodoComponent {
    constructor(@Inject(Dispatch) private dispatch: Observer<ActionType>) {
    }

    onClick(input) {
        const addTodo = new AddTodoActionType(input.value);
        this.dispatch.next(addTodo);
        input.value = '';
    }
}
