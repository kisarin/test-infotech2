import { TestInfotech2Page } from './app.po';

describe('test-infotech2 App', () => {
  let page: TestInfotech2Page;

  beforeEach(() => {
    page = new TestInfotech2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
