import { createRef, PureComponent, RefObject } from 'react';

type HeaderProps = {
  defaultValue: string;
  handleClick: (search: string) => void;
};

class Header extends PureComponent<HeaderProps> {
  inputRef: RefObject<HTMLInputElement>;

  constructor(props: HeaderProps) {
    super(props);
    this.inputRef = createRef();
  }

  render() {
    const { defaultValue, handleClick } = this.props;

    return (
      <div>
        <input type="text" ref={this.inputRef} defaultValue={defaultValue} />
        <button type="button" onClick={() => handleClick(this.inputRef.current?.value ?? '')}>
          Search
        </button>
      </div>
    );
  }
}

export default Header;
