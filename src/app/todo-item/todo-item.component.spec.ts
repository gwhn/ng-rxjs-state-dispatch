/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';

describe('Component: TodoItem', () => {
  it('should create an instance', () => {
    let component = new TodoItemComponent();
    expect(component).toBeTruthy();
  });
});
