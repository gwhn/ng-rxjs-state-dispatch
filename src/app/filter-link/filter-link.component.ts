import {Component, Inject, Input} from '@angular/core';
import {State, Dispatch} from "../state-fn";
import {AppState} from "../app-state";
import {Observable, Observer} from "rxjs/Rx";
import {ActionType} from "../action-types";
import {SetVisibilityFilterActionType} from "../set-visibility-filter-action-type";

@Component({
    moduleId: module.id,
    selector: 'filter-link',
    templateUrl: 'filter-link.component.html',
    styleUrls: ['filter-link.component.css']
})
export class FilterLinkComponent {
    @Input() filter: string;
    private isSelected: boolean = false;

    constructor(@Inject(State) private state: Observable<AppState>,
                @Inject(Dispatch) private dispatch: Observer<ActionType>) {
        this.state
            .map(as => as.visibilityFilter === this.filter)
            .subscribe(v => this.isSelected = v);
    }

    onClick(event) {
        const actionType = new SetVisibilityFilterActionType(this.filter);
        this.dispatch.next(actionType);
    }

    get textEffect() {
        return this.isSelected;
    }

}
