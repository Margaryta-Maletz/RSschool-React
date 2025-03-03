import Link from 'next/link';

function ErrorPage() {
  return (
    <div>
      <h1> Oops </h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <b>404</b> <i>error happens suddenly</i>
      </p>
      <p style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link href="/">Home</Link>
        <Link href="..">Previous page</Link>
      </p>
    </div>
  );
}

export default ErrorPage;
