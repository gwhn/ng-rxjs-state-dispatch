import {Component, Inject} from '@angular/core';
import {Dispatch} from "../state-fn";
import {Observer} from "rxjs/Rx";
import {Action, AddTodoAction} from "../actions";

@Component({
    moduleId: module.id,
    selector: 'add-todo',
    templateUrl: 'add-todo.component.html',
    styleUrls: ['add-todo.component.css']
})
export class AddTodoComponent {
    constructor(@Inject(Dispatch) private dispatch: Observer<Action>) {
    }

    onClick(input) {
        const addTodo = new AddTodoAction(input.value);
        this.dispatch.next(addTodo);
        input.value = '';
    }
}
