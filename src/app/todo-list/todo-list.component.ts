import {Component, Inject} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {state, dispatch} from "../state-fn";
import {ToggleTodo} from "../toggle-todo";
import {Subject, Observable} from "rxjs/Rx";
import {Action} from "../action";
import {AppState} from "../app-state";

@Component({
    moduleId: module.id,
    selector: 'app-todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css'],
    directives: [TodoItemComponent]
})
export class TodoListComponent {

    constructor(@Inject(state) private state: Observable<AppState>,
                @Inject(dispatch) private dispatch: Subject<Action>) {
    }

    onToggle(id) {
        this.dispatch.next(new ToggleTodo(id));
    }

    get filtered() {
        return this.state.map(appState => {
            return appState.todos.filter(todo => {
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
