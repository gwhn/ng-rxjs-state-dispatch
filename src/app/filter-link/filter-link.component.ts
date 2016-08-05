import {Component, Inject, Input} from '@angular/core';
import {State, Dispatch} from "../state-fn";
import {AppState} from "../app-state";
import {Observable, Observer} from "rxjs";
import {ActionType} from "../action-types";

@Component({
    moduleId: module.id,
    selector: 'app-filter-link',
    templateUrl: 'filter-link.component.html',
    styleUrls: ['filter-link.component.css']
})
export class FilterLinkComponent {
    @Input() filter: string;
    private isSelected: boolean;

    constructor(@Inject(State) private state: Observable<AppState>,
                @Inject(Dispatch) private dispatch: Observer<ActionType>) {
        this.state
            .map(as => as.visibilityFilter === this.filter)
            .subscribe(v => this.isSelected = v);
    }

    get textEffect() {
        return this.isSelected;
    }

}
