import {Component, ChangeDetectionStrategy} from '@angular/core';
import {stateAndDispatcher} from "./state-fn";
import {TodoListComponent} from "./todo-list/todo-list.component";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [TodoListComponent],
    providers: [stateAndDispatcher],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'To Dos';
}
