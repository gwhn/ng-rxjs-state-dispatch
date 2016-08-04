import { Ng2RxjsStateDispatchPage } from './app.po';

describe('ng2-rxjs-state-dispatch App', function() {
  let page: Ng2RxjsStateDispatchPage;

  beforeEach(() => {
    page = new Ng2RxjsStateDispatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
