import {Component, ElementRef, AfterViewChecked, AfterViewInit} from '@angular/core';
import {TodoService} from "../todo.service";

@Component({
    moduleId: module.id,
    selector: 'log-list',
    templateUrl: 'log-list.component.html',
    styleUrls: ['log-list.component.css']
})
export class LogListComponent implements AfterViewInit, AfterViewChecked {
    log$;

    constructor(private service: TodoService,
                private el: ElementRef) {
        this.log$ = service.log$;
    }

    private ol: HTMLElement;

    ngAfterViewInit() {
        this.ol = this.el.nativeElement.querySelector('ol');
    }

    ngAfterViewChecked() {
        if (this.ol) {
            this.ol.scrollTop = this.ol.scrollHeight;
        }
    }
}

