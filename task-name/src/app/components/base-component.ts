export type ComponentProperties<K extends keyof HTMLElementTagNameMap = 'div'> =
  Partial<HTMLElementTagNameMap[K]> & {
    text?: string;
    elementTag: K;
    classes?: string[];
  };

const ZERO_LENGTH = 0;

export default class BaseComponent<
  K extends keyof HTMLElementTagNameMap = 'div',
> {
  public childComponents: BaseComponent<keyof HTMLElementTagNameMap>[] = [];
  protected parentComponent:
    | BaseComponent<keyof HTMLElementTagNameMap>
    | undefined = undefined;
  protected element: HTMLElementTagNameMap[K];

  constructor(
    properties: ComponentProperties<K>,
    ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
  ) {
    const { elementTag, text, classes, ...rest } = properties;
    this.element = document.createElement(elementTag);

    if (children.length > ZERO_LENGTH) {
      this.appendChildren(...children);
    }

    if (text) {
      this.setText(text);
    }

    if (classes && classes.length > ZERO_LENGTH) {
      this.addClasses(...classes);
    }

    Object.assign(this.element, rest);
  }

  public appendChildren(
    ...children: BaseComponent<keyof HTMLElementTagNameMap>[]
  ): this {
    for (const child of children) this.appendSingle(child);

    return this;
  }

  public appendSingle(child: BaseComponent<keyof HTMLElementTagNameMap>): this {
    this.element.append(child.getElement());
    this.childComponents.push(child);
    child.parentComponent = this;

    return this;
  }

  public getElement(): HTMLElementTagNameMap[K] {
    return this.element;
  }

  public removeSelf(): void {
    this.removeChildren();
    this.element.remove();
    if (this.parentComponent) {
      this.parentComponent.childComponents =
        this.parentComponent.childComponents.filter((child) => child !== this);
    }
  }

  public removeChildren(): this {
    for (const child of this.childComponents) child.removeSelf();
    this.childComponents.length = 0;

    return this;
  }
  public addClasses(...classes: string[]): this {
    this.element.classList.add(...classes);

    return this;
  }

  public removeClasses(...classes: string[]): this {
    this.element.classList.remove(...classes);

    return this;
  }

  public toggleClasses(...classes: string[]): this {
    for (const className of classes) {
      this.element.classList.toggle(className);
    }

    return this;
  }

  public setText(text: string): this {
    this.element.textContent = text;

    return this;
  }

  public addListener(
    eventType: keyof DocumentEventMap,
    handler: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions
  ): this {
    this.element.addEventListener(eventType, handler, options);

    return this;
  }

  public removeListener(
    eventType: keyof DocumentEventMap,
    handler: EventListenerOrEventListenerObject
  ): this {
    this.element.removeEventListener(eventType, handler);

    return this;
  }
}
