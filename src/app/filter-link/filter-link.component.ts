import {Component, Input} from '@angular/core';
import {TodoService} from "../todo.service";

@Component({
    moduleId: module.id,
    selector: 'filter-link',
    templateUrl: 'filter-link.component.html',
    styleUrls: ['filter-link.component.css']
})
export class FilterLinkComponent {
    @Input() filter: string;
    private isSelected: boolean = false;

    constructor(private service:TodoService) {
        service.visibility$.map(v => v === this.filter).subscribe(v => this.isSelected = v);
    }

    onClick(event) {
        this.service.setVisibility(this.filter);
        this.service.log(`filtered by ${this.filter}`);
    }
}
