import React from 'react';

interface BoxProps {
    className: string;
}

const Box: React.FC<BoxProps> = ({ className }) => <div className={className}></div>


export default Box;