import React from 'react';
import  Chimebox  from 'react-chimebox'

function App() {
  return (
      <div className="App">
          <h1>My Test App</h1>
					{/*org45.netlify.app keys*/}
          <Chimebox siteId="e641328e-f5fd-4ee4-ad2a-eea64a58406f" turnstileDataSiteKey="0x4AAAAAAAyyLs9gui2lJm5y" />
      </div>
  );
}

export default App;
