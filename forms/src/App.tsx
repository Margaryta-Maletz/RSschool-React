import './App.css';
import { NavLink } from 'react-router';

function App() {
  return (
    <>
      <h1> Home </h1>
      <nav style={{ display: 'flex', gap: '50px' }}>
        <NavLink
          to="uncontrolled-form"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Uncontrolled Form
        </NavLink>

        <NavLink
          to="react-hook-form"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          React Hook Form
        </NavLink>
      </nav>
    </>
  );
}

export default App;
