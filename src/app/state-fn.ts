import {AppState, Filters} from "./app-state";
import {
    Action, TodoAction, FilterAction,
    AddTodoAction, ToggleTodoAction, SetVisibilityFilterAction, SetSortOrderAction, LogAction
} from "./actions";
import {Todo} from "./todo";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {OpaqueToken} from "@angular/core";

export const stateFn = (initial: AppState, action$: Observable<Action>): Observable<AppState> => {
    const subject$ = new BehaviorSubject(initial);
    Observable
        .zip(
            todosReducer(initial.todos, action$),
            filtersReducer(initial.filters, action$),
            logReducer(initial.log, action$),
            (todos, filters, log) => {
                return {
                    todos,
                    filters,
                    log
                } as AppState;
            }
        )
        .do(v => console.log(v))
        .subscribe(state => {
            subject$.next(state);
        });
    return subject$;
};

const todosReducer = (initial: Todo[], action$: Observable<Action>): Observable<Todo[]> => {
    const id = (todos: Todo[]) => {
        return todos.reduce((a, v) => v.id > a ? v.id : a, 0) + 1;
    };

    return action$
        .scan((todos: Todo[], action: TodoAction) => {
            if (action instanceof AddTodoAction) {
                const newTodo = {
                    id: id(todos),
                    text: action.text,
                    completed: false
                } as Todo;
                return [...todos, newTodo];
            }
            if (action instanceof ToggleTodoAction) {
                return todos.map((todo: Todo) => {
                    //noinspection TypeScriptUnresolvedFunction
                    return action.id !== todo.id
                        ? todo
                        : Object.assign({}, todo, {completed: !todo.completed});
                });
            }
            return todos;
        }, initial);
};

const filtersReducer = (initial: Filters, action$: Observable<Action>): Observable<Filters> => {
    return action$
        .scan((filters: Filters, action: FilterAction) => {
            if (action instanceof SetVisibilityFilterAction) {
                //noinspection TypeScriptUnresolvedFunction
                return Object.assign({}, filters, {visibility: action.type});
            }
            if (action instanceof SetSortOrderAction) {
                //noinspection TypeScriptUnresolvedFunction
                return Object.assign({}, filters, {sortOrder: action.direction});
            }
            return filters;

        }, initial);
};

const logReducer = (initial: string[], action$: Observable<Action>): Observable<string[]> => {
    return action$
        .scan((log: string[], action: LogAction) => {
            if (action instanceof LogAction) {
                return [...log, action.message];
            }
            return log;
        }, initial);
};

export const InitialState = new OpaqueToken('InitialState');
export const Dispatch = new OpaqueToken('Dispatch');
export const State = new OpaqueToken('State');
export const StateAndDispatch = [
    {
        provide: InitialState,
        useValue: {
            todos: [],
            filters: {
                visibility: 'SHOW_ALL',
                sortOrder: 'ASC'
            },
            log: []
        } as AppState
    },
    {
        provide: Dispatch,
        useValue: new BehaviorSubject<Action>(null)
    },
    {
        provide: State,
        useFactory: stateFn,
        deps: [InitialState, Dispatch]
    }
];
