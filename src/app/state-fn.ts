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
                } as AppState;
            }
        )
        .subscribe(state => {
            subject$.next(state);
        });
    return subject$;
};

const todosReducer = (initial: Todo[], action$: Observable<ActionType>): Observable<Todo[]> => {
    const id = (todos: Todo[]) => {
        const length = todos.length;
        return length > 0
            ? todos[length - 1].id + 1
            : 1;
    };

    return action$
        .scan((todos: Todo[], action: TodoActionType) => {
            if (action instanceof AddTodoActionType) {
                const newTodo = {
                    id: id(todos),
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

export const InitialState = new OpaqueToken('InitialState');
export const Dispatch = new OpaqueToken('Dispatch');
export const State = new OpaqueToken('State');
export const StateAndDispatch = [
    {
        provide: InitialState,
        useValue: {
            todos: [],
            visibilityFilter: 'SHOW_ALL'
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
