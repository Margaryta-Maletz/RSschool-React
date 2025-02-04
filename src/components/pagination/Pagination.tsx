import { useSearchParams } from 'react-router-dom';
import './Pagination.css';

type MainProps = {
  all: number;
};

function Pagination({ all }: MainProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const current = Number(page);
  return (
    <div className="pagination-container">
      <button
        type="button"
        disabled={current <= 1}
        onClick={() => setSearchParams((prev) => ({ ...prev, page: (current - 1).toString() }))}
      >
        Previous
      </button>
      {`${current} / ${all}`}
      <button
        type="button"
        disabled={current >= all}
        onClick={() => setSearchParams((prev) => ({ ...prev, page: (current + 1).toString() }))}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
