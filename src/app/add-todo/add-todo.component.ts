import {Component, Inject} from '@angular/core';
import {AddTodoActionType} from "../add-todo-action-type";
import {Dispatch, State} from "../state-fn";
import {Observer, Observable} from "rxjs/Rx";
import {ActionType} from "../action-types";
import {AppState} from "../app-state";
import 'rxjs/add/operator/max';

@Component({
    moduleId: module.id,
    selector: 'add-todo',
    templateUrl: 'add-todo.component.html',
    styleUrls: ['add-todo.component.css']
})
export class AddTodoComponent {
    private nextId: number;

    constructor(@Inject(State) private state: Observable<AppState>,
                @Inject(Dispatch) private dispatch: Observer<ActionType>) {
        this.state
            .map(as => {
                return as.todos
                    .map(v => v.id)
                    .reduce((a, v) => v > a ? v : a, 0);
            })
            .subscribe(v => this.nextId = v + 1);
    }

    onClick(input) {
        const addTodo = new AddTodoActionType(this.nextId, input.value);
        this.dispatch.next(addTodo);
        input.value = '';
    }
}
