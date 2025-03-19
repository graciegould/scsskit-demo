import React, { useState, useEffect } from 'react';
import scsskit from 'scsskit' 
import _ from 'lodash'
const DebugScreenSize: React.FC = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="debug">
            <div>Width: {width}px</div>
            <div>Height: {height}px</div>
            <div className='breakpoints'>
                {Object.entries(scsskit.breakpoints).map(([breakpoint, condition]) => (
                    <div key={breakpoint} className={`breakpoint-${_.kebabCase(breakpoint)}`}>
                        Breakpoint: {_.kebabCase(breakpoint)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DebugScreenSize;