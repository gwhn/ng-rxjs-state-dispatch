import {Injectable, Inject} from '@angular/core';
import {State, Dispatch} from "./state-fn";
import {AppState} from "./app-state";
import {Observable, Observer} from "rxjs/Rx";
import {
    Action, LogAction, AddTodoAction, ToggleTodoAction, SetSortOrderAction,
    SetVisibilityFilterAction, SortAscendingAction, SortDescendingAction
} from "./actions";
import {Todo} from "./todo";

@Injectable()
export class TodoService {
    todos$: Observable<Todo[]>;
    count$: Observable<number>;
    visibility$: Observable<string>;
    sortOrder$: Observable<string>;
    log$: Observable<string[]>;

    private visibility: string;
    private sortOrder: string;

    constructor(@Inject(State) private state: Observable<AppState>,
                @Inject(Dispatch) private dispatch: Observer<Action>) {
        this.todos$ = state.map(v => v.todos);

        this.count$ = this.todos$.map(v => v.length);

        this.visibility$ = state.map(v => v.filters.visibility);
        this.visibility$.subscribe(v => this.visibility = v);

        this.sortOrder$ = state.map(v => v.filters.sortOrder);
        this.sortOrder$.subscribe(v => this.sortOrder = v);

        this.log$ = state.map(v => v.log);
    }

    get filtered$(): Observable<Todo[]> {
        return this.todos$
            .map(ts => {
                return ts.filter(t => {
                    switch (this.visibility) {
                        case 'SHOW_ACTIVE':
                            return !t.completed;
                        case 'SHOW_COMPLETED':
                            return t.completed;
                        default:
                            return true;
                    }
                });
            });
    }

    log(message: string): void {
        Observable
            .create(obs => {
                setTimeout(() => {
                    obs.next(`async: ${message}`);
                    obs.complete();
                }, 5000);
                obs.next(`sync: ${message}`);
            })
            .subscribe(value => this.dispatch.next(new LogAction(value)));
    }

    add(text: string): void {
        const addTodo = new AddTodoAction(text);
        this.dispatch.next(addTodo);
    }

    toggle(id: number): void {
        this.dispatch.next(new ToggleTodoAction(id));
    }

    sortDirection(order: string): void {
        const action = new SetSortOrderAction(order);
        this.dispatch.next(action);
        if (order === 'ASC'){
            this.dispatch.next(new SortAscendingAction());
        } else {
            this.dispatch.next(new SortDescendingAction());
        }
    }

    setVisibility(filter: string): void {
        const action = new SetVisibilityFilterAction(filter);
        this.dispatch.next(action);
    }
}
