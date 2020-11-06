import React from 'react';

const SkipBackwardsButton = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    height="40"
    viewBox="0 0 24 24"
    width="40"
    fill="white"
  >
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path d="M11.99,5V1l-5,5l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6h-2c0,4.42,3.58,8,8,8s8-3.58,8-8S16.41,5,11.99,5z" />
        <g>
        <text textAnchor="middle" fill="white" fontFamily="Verdana" fontWeight="bold" fontSize="6" x="12" y="16" > {props.number} </text>
        </g>
      </g>
    </g>
  </svg>
);

export default SkipBackwardsButton;
