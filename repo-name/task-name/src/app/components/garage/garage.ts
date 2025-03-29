import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';

import * as styles from './garage.module.scss';

export default class Garage extends BaseComponent<'div'> {
  constructor() {
    super({ elementTag: 'div' });
    const linkWinners = tag.a({
      classes: [styles.temp],
      text: 'link to winners',
      href: './winners',
    });
    const linkError = tag.a({
      classes: [styles.temp],
      text: 'link to error page',
      href: '../hello-error',
    });
    const linkError2 = tag.a({
      classes: [styles.temp],
      text: 'link 2 to error page',
      href: './hello-error-2',
    });

    this.appendChildren(linkWinners, linkError, linkError2);
  }
}
