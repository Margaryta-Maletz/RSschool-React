
/*import './Pagination.css';*/
import {useRouter, useSearchParams} from "next/navigation";

type MainProps = {
  all: number;
};

function Pagination({ all }: MainProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
  const page = searchParams.get('page') ?? '1';
  const setSearchParams = (shift: number = 1) => {
      const newQueryParam = "new_value"; // Новое значение для параметра
      const queryParamKey = "page";
  }

  const current = Number(page);
  return (
    <div className="pagination-container">
      <button
        type="button"
        disabled={current <= 1}
        onClick={() => setSearchParams(-1)}
      >
        Previous
      </button>
      {`${current} / ${all}`}
      <button
        type="button"
        disabled={current >= all}
        onClick={() => setSearchParams()}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
