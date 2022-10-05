import { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { colors, codes } from './data';
import {useEffect} from 'react';


const Cat = () => {
  const history = useHistory();
  const [colorNum, setColorNum] = useState(0);
  const [statusChange, setStatusChange] = useState(
    localStorage.getItem('catStatus') || '418');
  const [status, setStatus] = useState('');


  const handleSubmit = e => {
    e.preventDefault();
    setStatusChange(status);
    setStatus('');
  };

  useEffect(() => {
    localStorage.setItem('catStatus', statusChange);
  }, [statusChange]);
  
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorNum(prevNum => ++prevNum % colors.length);
    }, 5000);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <div
      className='cat-container'
      style={{
        backgroundColor: colors[colorNum],
        transition: 'background-color 4s',
      }}
    >
      <h1>Cat Status</h1>
      <button onClick={() => history.push('/')}>Home</button>
      <div className='image-container'>
        <img src={`https://http.cat/${statusChange}`} alt='404' />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='cStatus'>
          <input
            type='number'
            id='cStatus'
            onChange={e => setStatus(e.target.value)}
            placeholder='find new status'
            value={status}
          />
        </label>
        <button type='submit'>Change Status</button>
      </form>
    </div>
  );
};

export default Cat;