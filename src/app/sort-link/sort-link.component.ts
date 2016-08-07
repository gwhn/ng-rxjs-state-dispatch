import {Component, Input} from '@angular/core';
import {TodoService} from "../todo.service";

@Component({
    moduleId: module.id,
    selector: 'sort-link',
    templateUrl: 'sort-link.component.html',
    styleUrls: ['sort-link.component.css']
})
export class SortLinkComponent {
    @Input() order: string;
    private isSelected: boolean = false;

    constructor(private service:TodoService) {
        service.sortOrder$.map(so => so == this.order).subscribe(v => this.isSelected = v);
    }

    onClick(event) {
        this.service.sortDirection(this.order);
        this.service.log(`sorted by ${this.order}`);
    }
}
