import React from 'react';
import axios from 'axios';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppContext from './config/context';

import Navbar from './components/Navbar';
import Coins from './components/Coins';
import Search from './components/Search';
import Coin from './pages/Coin';
import Pagination from './components/Pagination';

function App() {
  const [coins, setCoins] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [visible, setVisible] = React.useState(true);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [currentItems, setCurrentItems] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const location = useLocation();
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(coins.length / itemsPerPage);

  const url = `${process.env.REACT_APP_API_COINS_URL}/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`;

  // Fetches data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url);
        const data = await response.data;
        setCoins(data);
        setLoading(false);
        console.log(url);
      } catch (error) {
        alert('Failed to load resource');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Pagination functions
  // Shows only coins between itemOffset, endOffset
  // E.g. it leaves coins between 10 and 20
  React.useEffect(() => {
    setCurrentItems(coins.slice(itemOffset, endOffset));
  }, [coins, itemOffset]);

  // Handles click when users interact with paginatination items(pages)
  const handlePageClick = (event) => {
    // E.g. user selects page #2(index===1), itemsPerPage === 10, all coins === 250
    // (1 * 10) % 250 === 10
    // So it shows coins between 10(itemOffset) and 20(endOffset)
    const newOffset = (event.selected * itemsPerPage) % coins.length;
    setItemOffset(newOffset);
    // Makes every th element(it's used for sorting data) invisible
    setVisible(false);
    // Makes sure that if the user goes to the Coin page and returns back
    // The current page stays the same
    setCurrentPage(event.selected);
  };

  // Table data sorting
  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...currentItems].sort((a, b) => {
        // Checking if a th value is null
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;

        return (
          // localeCompare handles different data types including strings and numbers('numeric')
          // It returns a negative number if the a is less than b and moves up value
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'desc' ? 1 : -1)
        );
      });

      // Sets final results to "coins"
      // It sets 'sorted' to currentItems because we don't need
      // To sort all coins and display them at once
      setCurrentItems(sorted);
    }
  };

  return (
    <AppContext.Provider value={{ visible, setVisible, setSearch }}>
      <div className="container">
        {location.pathname === '/' && (
          <>
            <Navbar />
            <Search />
          </>
        )}
        <Routes>
          <Route
            path="/"
            element={
              coins.length > 0 && (
                <Coins
                  coins={coins}
                  currentItems={currentItems}
                  loading={loading}
                  search={search}
                  handleSorting={handleSorting}
                />
              )
            }
          />
          <Route path="/coin" element={<Coin />}>
            <Route path=":coinId" element={<Coin />} />
          </Route>
        </Routes>
        {location.pathname === '/' && (
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
