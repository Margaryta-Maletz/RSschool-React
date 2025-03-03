import { useRouter } from 'next/router';

const DetailedPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{`Detailed Page ${id}`}</div>;
};

export default DetailedPage;
