import Calendar from "./Calendar";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from "./NotFound";
import Date from "./Date";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calendar />}></Route>
          <Route path="/date/:dateId" element={<Date />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;