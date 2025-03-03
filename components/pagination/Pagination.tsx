/*import './Pagination.css';*/
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type MainProps = {
  all: number;
};

function Pagination({ all }: MainProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const search = searchParams.get('search') ?? '';

  const current = Number(page);
  return (
    <div className="pagination-container">
      <Link href={`?search=${search}&page=${+page - 1}`} hidden={+page === 1}>
        Previous
      </Link>
      {`${current} / ${all}`}
      <Link href={`?search=${search}&page=${+page + 1}`} hidden={+page === all}>
        Next
      </Link>
    </div>
  );
}

export default Pagination;
