import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';


interface EvaluationProps {
  vote_count: number;
  vote_average: number;
}

// CIRCLE CONSTANTS
const size = 60;
const strokeWidth = 5;

const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

const EvaluationCircle: React.FC<EvaluationProps> = ({ vote_count, vote_average }) => {
  const circleRef = useRef<any>(null);
  
  const [progress, ] = useState(vote_average);
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = ((10 - (-progress)) / 10) * circumference;
    setOffset(progressOffset);
    circleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out;';
}, [setOffset, progress, offset]);

  return (
    <div className="evaluation-container" style={vote_count===0 ? {opacity: 0} : {}}> 
    <svg
      className="svg"
      width={size}
      height={size}
    >
      <circle
        className="svg-circle"
        ref={circleRef}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text 
        x={`${center}`} 
        y={`${center+strokeWidth}`} 
        className="svg-circle-text"
      >
        {progress.toLocaleString()}
      </text>
    </svg>
    <span className="vote-count">{vote_count} votos</span>
    </div>
  );
}

export default EvaluationCircle;