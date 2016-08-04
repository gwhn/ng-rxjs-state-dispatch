import {AppState} from "./app-state";
import {Action, TodoAction, FilterAction} from "./action";
import {Observable, BehaviorSubject} from "rxjs";
import {Todo} from "./todo";

export const stateFn = (initial: AppState, action$: Observable<Action>): Observable<AppState> => {
    const subject$ = new BehaviorSubject(initial);
    Observable
        .zip(
            todosReducer(initial.todos, action$),
            visibilityFilterReducer(initial.visibilityFilter, action$),
            (todos, visibilityFilter) => {
                return {
                    todos,
                    visibilityFilter
                };
            }
        )
        .subscribe(state => {
            subject$.next(state);
        });
    return subject$;
};

const todosReducer = (initial: Todo[], action$: Observable<TodoAction>): Observable<Todo[]> => {
    return undefined;
}

const visibilityFilterReducer = (initial: string, action$: Observable<FilterAction>): Observable<string> => {
    return undefined;
}