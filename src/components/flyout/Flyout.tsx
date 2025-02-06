import { useDispatch, useSelector } from 'react-redux';
import { ICharacter } from '../../models/people';
import './Flyout.css';
import checkedCardsSelector from '../../store/selectors';
import { clearAllCheckedCards } from '../../store/checkedCardSlice';

function Flyout() {
  const dispatch = useDispatch();
  const checkedCards: ICharacter[] = useSelector(checkedCardsSelector);

  const handleUnselectAllClick = () => {
    dispatch(clearAllCheckedCards());
  };

  const handleDownloadClick = () => {
    const csvHeader = `name;gender;birth_year;height;mass;url\n`;
    const csvFile = checkedCards.reduce((acc, ch) => {
      const newLine = `${ch.name};${ch.gender};${ch.birth_year};${ch.height};${ch.mass};${ch.url}\n`;
      return `${acc}${newLine}`;
    }, csvHeader);

    const csvData = new Blob([csvFile], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${checkedCards.length}_people.csv`;
    link.click();
  };

  return checkedCards.length ? (
    <div className="flyout-container">
      <p>{`${checkedCards.length} items are selected`}</p>
      <button type="button" onClick={handleUnselectAllClick}>
        Unselect all
      </button>
      <button type="button" onClick={handleDownloadClick}>
        Download
      </button>
    </div>
  ) : null;
}

export default Flyout;
