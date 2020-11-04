import React from 'react';

const LiveTag = () => {
  const color = '#ECB61C';
  return (
    <div
      style={{
        border: '3px solid ' + color,
        color: color,
        width: '75px',
        margin: '10px 0',
        textAlign: 'center',
      }}
    >
      Direkte
    </div>
  );
};

export default LiveTag;
