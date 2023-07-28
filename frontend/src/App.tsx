import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TicketListPage from "./pages/TicketListPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<TicketListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
