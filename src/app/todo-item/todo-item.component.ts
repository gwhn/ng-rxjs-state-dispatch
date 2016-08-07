import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from "../todo";

@Component({
    moduleId: module.id,
    selector: 'todo-item',
    templateUrl: 'todo-item.component.html',
    styleUrls: ['todo-item.component.css']
})
export class TodoItemComponent {
    @Input() item: Todo;
    @Output() toggle = new EventEmitter();

    onClick(event) {
        this.toggle.emit(event);
    }
}
