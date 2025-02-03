import { RootState } from './store';

const checkedCardsSelector = (state: RootState) => state.checkedCard.checkedCards;

export default checkedCardsSelector;
