import {Component, Inject} from '@angular/core';
import {AddTodoActionType} from "../add-todo-action-type";
import {Dispatch, State} from "../state-fn";
import {Observer, Observable} from "rxjs/Rx";
import {ActionType} from "../action-types";
import {AppState} from "../app-state";

@Component({
    moduleId: module.id,
    selector: 'add-todo',
    templateUrl: 'add-todo.component.html',
    styleUrls: ['add-todo.component.css']
})
export class AddTodoComponent {
    private nextId:number;

    constructor(@Inject(State) private state:Observable<AppState>,
                @Inject(Dispatch) private dispatch: Observer<ActionType>) {
        state.subscribe(value => this.nextId = value.nextId);
    }

    onClick(input) {
        const addTodo = new AddTodoActionType(this.nextId, input.value);
        this.dispatch.next(addTodo);
        input.value = '';
    }
}
