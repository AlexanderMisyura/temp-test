import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';

import * as styles from './error.module.scss';

export default class ErrorPage extends BaseComponent<'div'> {
  constructor() {
    super({ elementTag: 'div' });
    const linkWinners = tag.div({
      classes: [styles.temp],
      text: "Oh, you're not supposed to be here",
    });
    const linkError = tag.a({
      classes: [styles.temp],
      text: 'go to garage',
      href: '../',
    });
    const linkError2 = tag.a({
      classes: [styles.temp],
      text: 'go to winners',
      href: '../winners',
    });

    this.appendChildren(linkWinners, linkError, linkError2);
  }
}
