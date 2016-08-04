/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import {AddTodo} from './add-todo';

describe('AddTodo', () => {
  it('should create an instance', () => {
    expect(new AddTodo(1, "test")).toBeTruthy();
  });
});
