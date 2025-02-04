import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div>
      <h1> Oops </h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <b>404</b> <i>error happens suddenly</i>
      </p>
      <p style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/">Home</Link>
        <Link to="..">Previous page</Link>
      </p>
    </div>
  );
}

export default ErrorPage;
