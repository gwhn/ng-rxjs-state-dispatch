import {Component} from '@angular/core';
import {TodoService} from "../todo.service";

@Component({
    moduleId: module.id,
    selector: 'add-todo',
    templateUrl: 'add-todo.component.html',
    styleUrls: ['add-todo.component.css']
})
export class AddTodoComponent {
    private count = 0;

    constructor(private service: TodoService) {
        service.count$.subscribe(v => this.count = v);
    }

    onClick(input) {
        this.service.add(input.value);
        this.service.log(`Added ${input.value}`);
        input.value = '';
    }
}
