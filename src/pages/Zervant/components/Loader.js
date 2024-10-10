import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = () => {
return (
<CircularProgress
color='primary'
size='100px'
style={{
margin: 'auto',
display: 'block',
}}
/>
);
};

export default Loader;