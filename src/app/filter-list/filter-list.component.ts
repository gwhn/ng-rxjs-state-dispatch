import {Component} from '@angular/core';
import {FilterLinkComponent} from "../filter-link/filter-link.component";
import {SortLinkComponent} from "../sort-link/sort-link.component";

@Component({
    moduleId: module.id,
    selector: 'filter-list',
    templateUrl: 'filter-list.component.html',
    styleUrls: ['filter-list.component.css'],
    directives: [
        FilterLinkComponent,
        SortLinkComponent
    ]
})
export class FilterListComponent {
}
