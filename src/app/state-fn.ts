import {AppState} from "./app-state";
import {ActionType, TodoActionType, FilterActionType} from "./action-types";
import {Todo} from "./todo";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {OpaqueToken} from "@angular/core";
import {AddTodoActionType} from "./add-todo-action-type";
import {ToggleTodoActionType} from "./toggle-todo-action-type";
import {SetVisibilityFilterActionType} from "./set-visibility-filter-action-type";

export const stateFn = (initial: AppState, action$: Observable<ActionType>): Observable<AppState> => {
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

const todosReducer = (initial: Todo[], action$: Observable<ActionType>): Observable<Todo[]> => {
    return action$
        .scan((todos:Todo[], action:TodoActionType) => {
            if (action instanceof AddTodoActionType) {
                const newTodo = {
                    id: action.id,
                    text: action.text,
                    completed: false
                } as Todo;
                return [...todos, newTodo];
            } else if (action instanceof ToggleTodoActionType) {
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

const visibilityFilterReducer = (initial: string, action$: Observable<ActionType>): Observable<string> => {
    return action$
        .scan((filter:string, action:FilterActionType) => {
            if (action instanceof SetVisibilityFilterActionType) {
                return action.type;
            } else {
                return filter;
            }
        }, initial);
};

export const InitialState = new OpaqueToken('InitialState');
export const Dispatch = new OpaqueToken('Dispatch');
export const State = new OpaqueToken('State');
export const StateAndDispatch = [
    {
        provide: InitialState,
        useValue: {todos: [], visibilityFilter: 'SHOW_ALL'} as AppState
    },
    {
        provide: Dispatch,
        useValue: new BehaviorSubject<ActionType>(null)
    },
    {
        provide: State,
        useFactory: stateFn,
        deps: [InitialState, Dispatch]
    }
];
