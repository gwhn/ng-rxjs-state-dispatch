import {AppState} from "./app-state";
import {Action, TodoAction, FilterAction} from "./action";
import {Todo} from "./todo";
import {AddTodo} from "./add-todo";
import {ToggleTodo} from "./toggle-todo";
import {SetVisibilityFilter} from "./set-visibility-filter";
import {OpaqueToken} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs/Rx";

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

const todosReducer = (initial: Todo[], action$: Observable<Action>): Observable<Todo[]> => {
    return action$
        .scan((todos:Todo[], action:TodoAction) => {
            if (action instanceof AddTodo) {
                const newTodo = {
                    id: action.id,
                    text: action.text,
                    completed: false
                } as Todo;
                return [...todos, newTodo];
            } else if (action instanceof ToggleTodo) {
                return todos.map((todo:Todo) => {
                    //noinspection TypeScriptUnresolvedFunction
                    return action.id !== todo.id
                        ? todo
                        : Object.assign({}, todo, {completed: !todo.completed});
                });
            } else {
                return todos;
            }
        }, initial);
};

const visibilityFilterReducer = (initial: string, action$: Observable<Action>): Observable<string> => {
    return action$
        .scan((filter:string, action:FilterAction) => {
            if (action instanceof SetVisibilityFilter) {
                return action.type;
            } else {
                return filter;
            }
        }, initial);
};

export const initialState = new OpaqueToken("initialState");
export const dispatcher = new OpaqueToken("dispatcher");
export const state = new OpaqueToken("state");
export const stateAndDispatcher = [
    {
        provide: initialState,
        useValue: {todos: [], visibilityFilter: 'SHOW_ALL'}
    },
    {
        provide: dispatcher,
        useValue: new BehaviorSubject<Action>(null)
    },
    {
        provide: state,
        useFactory: stateFn,
        deps: [initialState, dispatcher]
    }
];