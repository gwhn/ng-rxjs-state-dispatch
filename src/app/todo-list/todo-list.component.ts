import {Component, Inject} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {State, Dispatch} from "../state-fn";
import {Observable, Observer} from "rxjs/Rx";
import {Action, ToggleTodoAction} from "../actions";
import {AppState} from "../app-state";

@Component({
    moduleId: module.id,
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css'],
    directives: [TodoItemComponent]
})
export class TodoListComponent {
    constructor(@Inject(State) private state: Observable<AppState>,
                @Inject(Dispatch) private dispatch: Observer<Action>) {
    }

    onToggle(id) {
        this.dispatch.next(new ToggleTodoAction(id));
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
