import {Component, Inject} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {State, Dispatch} from "../state-fn";
import {ToggleTodoActionType} from "../toggle-todo-action-type";
import {Observable, Observer} from "rxjs/Rx";
import {ActionType} from "../action-types";
import {AppState} from "../app-state";
import {Todo} from "../todo";

@Component({
    moduleId: module.id,
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css'],
    directives: [TodoItemComponent]
})
export class TodoListComponent {
    constructor(@Inject(State) private state: Observable<AppState>,
                @Inject(Dispatch) private dispatch: Observer<ActionType>) {
    }

    onToggle(id) {
        this.dispatch.next(new ToggleTodoActionType(id));
    }

    get filtered() {
        return this.state.map(appState => {
            return appState.todos
                .filter(todo => {
                    switch (appState.visibilityFilter) {
                        case 'SHOW_ACTIVE':
                            return !todo.completed;
                        case 'SHOW_COMPLETED':
                            return todo.completed;
                        default:
                            return true;
                    }
                });
        });
    }
}
