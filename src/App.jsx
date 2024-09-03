import { useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./components/Details";
import SearchParams from "./components/SearchParams";
import AdoptedPetContext from "./components/AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptPet = useState(null);
  return (
    <>
      <AdoptedPetContext.Provider value={adoptPet}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </QueryClientProvider>
        </BrowserRouter>
      </AdoptedPetContext.Provider>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
