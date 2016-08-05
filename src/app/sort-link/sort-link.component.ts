import {Component, Input, Inject} from '@angular/core';
import {State, Dispatch} from "../state-fn";
import {Observable, Observer} from "rxjs/Rx";
import {AppState} from "../app-state";
import {Action, SetSortOrderAction} from "../actions";

@Component({
    moduleId: module.id,
    selector: 'sort-link',
    templateUrl: 'sort-link.component.html',
    styleUrls: ['sort-link.component.css']
})
export class SortLinkComponent {
    @Input() order: string;
    private isSelected: boolean = false;

    constructor(@Inject(State) private state: Observable<AppState>,
                @Inject(Dispatch) private dispatch: Observer<Action>) {
        this.state
            .map(as => as.filters.sortOrder === this.order)
            .subscribe(v => this.isSelected = v);
    }

    onClick(event) {
        const action = new SetSortOrderAction(this.order);
        this.dispatch.next(action);
    }

    get textEffect() {
        return this.isSelected;
    }

}
