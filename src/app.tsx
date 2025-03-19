import React, { useEffect } from 'react'
import './scss/app.scss'
import DebugScreenSize from './debugScreenSize'
import Box from './box'
import scsskit from 'scsskit' 

const App: React.FC = () => {
  return (
      <div className="app">
        <DebugScreenSize />
        <div className='boxes'>
            {Array.from({ length: 9 }, (_, index) => (
              <Box key={index} className={`box-${index}`} />
            ))}
        </div>
      </div>
    )
}


export default App;