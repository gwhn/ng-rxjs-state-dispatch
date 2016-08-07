import {Component} from '@angular/core';
import {TodoService} from "../todo.service";

@Component({
    moduleId: module.id,
    selector: 'log-list',
    templateUrl: 'log-list.component.html',
    styleUrls: ['log-list.component.css']
})
export class LogListComponent {
    log$;

    constructor(private service: TodoService) {
        this.log$ = service.log$;
    }
}
