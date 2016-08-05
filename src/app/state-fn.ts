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
            nextIdReducer(initial.nextId, action$),
            (todos, visibilityFilter, nextId) => {
                return {
                    todos,
                    visibilityFilter,
                    nextId
                } as AppState;
            }
        )
        .subscribe(state => {
            subject$.next(state);
        });
    return subject$;
};

const todosReducer = (initial: Todo[], action$: Observable<ActionType>): Observable<Todo[]> => {
    return action$
        .scan((todos: Todo[], action: TodoActionType) => {
            if (action instanceof AddTodoActionType) {
                const newTodo = {
                    id: action.id,
                    text: action.text,
                    completed: false
                } as Todo;
                return [...todos, newTodo];
            }
            if (action instanceof ToggleTodoActionType) {
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

const visibilityFilterReducer = (initial: string, action$: Observable<ActionType>): Observable<string> => {
    return action$
        .scan((filter: string, action: FilterActionType) => {
            if (action instanceof SetVisibilityFilterActionType) {
                return action.type;
            }
            return filter;
        }, initial);
};

const nextIdReducer = (initial: number, action$: Observable<ActionType>): Observable<number> => {
    return action$
        .scan((nextId: number, action: TodoActionType) => {
            if (action instanceof AddTodoActionType) {
                return nextId += 1;
            }
            return nextId;
        }, initial);
}

export const InitialState = new OpaqueToken('InitialState');
export const Dispatch = new OpaqueToken('Dispatch');
export const State = new OpaqueToken('State');
export const StateAndDispatch = [
    {
        provide: InitialState,
        useValue: {
            todos: [],
            visibilityFilter: 'SHOW_ALL',
            nextId: 1
        } as AppState
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
