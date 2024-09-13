import { useState } from 'react';
import MyComponent from './MyComponent';

function App() {
  return (
    <MyComponent
      url={'https://picsum.photos/v2/list'}
      page={'1'}
      limit={'10'}
    />
  );
}

export default App;
