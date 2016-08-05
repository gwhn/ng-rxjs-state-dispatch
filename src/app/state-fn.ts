import {AppState} from "./app-state";
import {Action, TodoAction, FilterAction, AddTodoAction, ToggleTodoAction, SetVisibilityFilterAction} from "./actions";
import {Todo} from "./todo";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {OpaqueToken} from "@angular/core";

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
                } as AppState;
            }
        )
        .subscribe(state => {
            subject$.next(state);
        });
    return subject$;
};

const todosReducer = (initial: Todo[], action$: Observable<Action>): Observable<Todo[]> => {
    const id = (todos: Todo[]) => {
        const length = todos.length;
        return length > 0
            ? todos[length - 1].id + 1
            : 1;
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

const visibilityFilterReducer = (initial: string, action$: Observable<Action>): Observable<string> => {
    return action$
        .scan((filter: string, action: FilterAction) => {
            if (action instanceof SetVisibilityFilterAction) {
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
        useValue: new BehaviorSubject<Action>(null)
    },
    {
        provide: State,
        useFactory: stateFn,
        deps: [InitialState, Dispatch]
    }
];
