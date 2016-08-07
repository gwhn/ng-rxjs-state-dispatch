import {Component} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {TodoService} from "../todo.service";
import {Todo} from "../todo";

@Component({
    moduleId: module.id,
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.css'],
    directives: [TodoItemComponent],
    providers: [TodoService]
})
export class TodoListComponent {
    private filtered: Todo[];

    constructor(private service:TodoService) {
        service.filtered$.subscribe(ts => this.filtered = ts);
    }

    onToggle(id) {
        this.service.toggle(id);
        this.service.log(`toggled todo #${id}`);
    }
}
