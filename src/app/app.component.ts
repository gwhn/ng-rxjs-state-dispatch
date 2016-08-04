import {Component, ChangeDetectionStrategy} from '@angular/core';
import {stateAndDispatcher} from "./state-fn";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [],
    providers: [stateAndDispatcher],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'To Dos';
}
