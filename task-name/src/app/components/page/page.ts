import BaseComponent from '@components/base-component';
import ErrorPage from '@components/error-page/error';
import Garage from '@components/garage/garage';
import tag from '@components/utility-components';
import Winners from '@components/winners/winners';
import machine from '@state-machine/machine';

import * as styles from './page.module.scss';

export default class Page extends BaseComponent<'main'> {
  private garage: Garage = new Garage();
  private winners: Winners = new Winners();
  private error: ErrorPage = new ErrorPage();
  private pageContainer: BaseComponent;

  constructor() {
    super({ elementTag: 'main' });
    const heading = tag.h1({
      classes: [styles.heading],
      text: 'Welcome to Async Tractor Race',
    });
    this.pageContainer = tag.div({ classes: [styles.page] });

    this.appendChildren(heading, this.pageContainer);
  }

  public mount(): void {
    this.handleRouteChange();
    document.body.append(this.getElement());
  }

  private handleRouteChange(): void {
    const { currentRoute } = machine.getFullContext();

    if (currentRoute === '') this.changeContent(this.garage);
    else if (currentRoute === 'winners') this.changeContent(this.winners);
    else this.changeContent(this.error);
  }

  private changeContent(newContent: BaseComponent): void {
    this.pageContainer.getElement().replaceChildren(newContent.getElement());
  }
}
