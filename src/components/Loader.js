import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <CircularProgress
      color="primary"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    />
  );
};

export default Loader;