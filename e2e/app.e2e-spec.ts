import { FmsAdminPage } from './app.po';

describe('fms-admin App', function() {
  let page: FmsAdminPage;

  beforeEach(() => {
    page = new FmsAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
