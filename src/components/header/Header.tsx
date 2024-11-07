import { createRef, KeyboardEventHandler, PureComponent, RefObject } from 'react';
import './Header.css';

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

  handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      const { handleClick } = this.props;

      event.preventDefault();
      handleClick(this.inputRef.current?.value ?? '');
    }
  };

  render() {
    const { defaultValue, handleClick } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('Test Error boundary!');
    }

    return (
      <div className="header-container">
        <input type="text" ref={this.inputRef} defaultValue={defaultValue} onKeyDown={this.handleKeyDown} />
        <button className="button" type="button" onClick={() => handleClick(this.inputRef.current?.value ?? '')}>
          Search
        </button>
        <button className="button error" type="button" onClick={() => this.setState({ hasError: true })}>
          Throw Error
        </button>
      </div>
    );
  }
}

export default Header;
