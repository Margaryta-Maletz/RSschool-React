import { FC } from 'react';
import { Link } from 'react-router';

const UncontrolledForm: FC = () => {
  return (
    <div>
      <h1> Uncontrolled Form </h1>
      <Link to="/"> Home </Link>
    </div>
  );
};

export default UncontrolledForm;
