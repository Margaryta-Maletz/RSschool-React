function Spinner() {
  return (
    <div
      data-testid="spinner"
      style={{ minWidth: '320px', position: 'absolute', margin: '0 auto', padding: '0 100px', top: 70 }}
    >
      ...Hold on, loading in progress
    </div>
  );
}

export default Spinner;
