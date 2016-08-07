import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AddTodoComponent} from "./add-todo/add-todo.component";
import {StateAndDispatch} from "./state-fn";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {FilterListComponent} from "./filter-list/filter-list.component";
import {TodoService} from "./todo.service";
import {LogListComponent} from "./log-list/log-list.component";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [
        AddTodoComponent,
        TodoListComponent,
        FilterListComponent,
        LogListComponent
    ],
    providers: [StateAndDispatch, TodoService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'To Dos';
}
