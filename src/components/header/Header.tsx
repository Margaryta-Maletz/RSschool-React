import { createRef, PureComponent, RefObject } from 'react';

type HeaderProps = {
  defaultValue: string;
  handleClick: (search: string) => void;
};

type State = {
  hasError: boolean;
};

class Header extends PureComponent<HeaderProps, State> {
  inputRef: RefObject<HTMLInputElement>;

  constructor(props: HeaderProps) {
    super(props);
    this.inputRef = createRef();
    this.state = { hasError: false };
  }

  render() {
    const { defaultValue, handleClick } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('Test Error boundary!');
    }

    return (
      <div>
        <input type="text" ref={this.inputRef} defaultValue={defaultValue} />
        <button type="button" onClick={() => handleClick(this.inputRef.current?.value ?? '')}>
          Search
        </button>
        <button type="button" onClick={() => this.setState({ hasError: true })}>
          Throw Error
        </button>
      </div>
    );
  }
}

export default Header;
