import Calendar from "./Calendar";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from "./NotFound";
import Detail from "./Detail";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          {/* path경로에 따라 다른 컴포넌트 호출 */}
          <Route path="/" element={<Calendar />}></Route> 
          <Route path="/date/:id" element={<Detail />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;