import React from 'react';

const SkipAheadButton = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    viewBox="0 0 24 24"
    fill="black"
    width="40px"
    height="40px"
  >
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path d="M18,13c0,3.31-2.69,6-6,6s-6-2.69-6-6s2.69-6,6-6v4l5-5l-5-5v4c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8H18z" />
        <text textAnchor="middle" fill="white" fontFamily="Verdana" fontWeight="bold" fontSize="6" x="12" y="16" > {props.number} </text>
      </g>
    </g>
  </svg>
);

export default SkipAheadButton;
