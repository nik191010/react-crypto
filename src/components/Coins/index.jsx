import React from 'react';
import AppContext from '../../config/context';

import { IconContext } from 'react-icons';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import CoinItem from '../CoinItem';

import styles from './Coins.module.scss';

const Coins = ({ coins, currentItems, search, loading, handleSorting }) => {
  const { visible, setVisible } = React.useContext(AppContext);

  const [sortField, setSortField] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  // const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  // Filters data depending on the search input
  // If the search input is empty it only shows coins of the current page(currentItems)
  // If there's something in the search, it compares the input with all coins
  // And returns the result
  const renderItems = () => {
    const filteredCoins =
      search === ''
        ? currentItems
        : coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

    // Loads skeleton if data isn't downloaded yet
    return (loading ? [...Array(8)] : filteredCoins).map((coin, index) => (
      <CoinItem key={index} coins={coin} loading={loading} />
    ));
  };

  // Sorting data function
  // If the th value(market_cap_rank) is equal to that which is currently stored in the "sortField"(market_cap_rank)
  // and the "order" is 'asc', then it sets 'desc' and vice versa
  // Then passes the th value and sortOrder to handleSorting function
  // And finally makes the th element visible
  const handleSortingChange = (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
    setVisible(true);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.row}>
            <th onClick={() => handleSortingChange('market_cap_rank')} className={styles.th}>
              <div className={styles.thWrap}>
                <span
                  className={`${styles.toggle} ${
                    visible && sortField === 'market_cap_rank' ? styles.visible : ''
                  }`}>
                  <IconContext.Provider value={{ className: styles.iconUp }}>
                    <div className={`${styles.icon} ${order === 'asc' ? styles.iconActive : ''}`}>
                      <RxTriangleUp />
                    </div>
                  </IconContext.Provider>
                  <IconContext.Provider value={{ className: styles.iconDown }}>
                    <div className={`${styles.icon} ${order === 'desc' ? styles.iconActive : ''}`}>
                      <RxTriangleDown />
                    </div>
                  </IconContext.Provider>
                </span>
                #
              </div>
            </th>
            <th onClick={() => handleSortingChange('name')} className={styles.th}>
              <div className={styles.thWrap}>
                <span
                  className={`${styles.toggle} ${
                    visible && sortField === 'name' ? styles.visible : ''
                  }`}>
                  <IconContext.Provider value={{ className: styles.iconUp }}>
                    <div className={`${styles.icon} ${order === 'asc' ? styles.iconActive : ''}`}>
                      <RxTriangleUp />
                    </div>
                  </IconContext.Provider>
                  <IconContext.Provider value={{ className: styles.iconDown }}>
                    <div className={`${styles.icon} ${order === 'desc' ? styles.iconActive : ''}`}>
                      <RxTriangleDown />
                    </div>
                  </IconContext.Provider>
                </span>
                Name
              </div>
            </th>
            <th
              onClick={() => handleSortingChange('price_change_percentage_24h')}
              className={styles.th}>
              <div className={styles.thWrap}>
                <span
                  className={`${styles.toggle} ${
                    visible && sortField === 'price_change_percentage_24h' ? styles.visible : ''
                  }`}>
                  <IconContext.Provider value={{ className: styles.iconUp }}>
                    <div className={`${styles.icon} ${order === 'asc' ? styles.iconActive : ''}`}>
                      <RxTriangleUp />
                    </div>
                  </IconContext.Provider>
                  <IconContext.Provider value={{ className: styles.iconDown }}>
                    <div className={`${styles.icon} ${order === 'desc' ? styles.iconActive : ''}`}>
                      <RxTriangleDown />
                    </div>
                  </IconContext.Provider>
                </span>
                Change(24h)
              </div>
            </th>
            <th onClick={() => handleSortingChange('current_price')} className={styles.th}>
              <div className={styles.thWrap}>
                <span
                  className={`${styles.toggle} ${
                    visible && sortField === 'current_price' ? styles.visible : ''
                  }`}>
                  <IconContext.Provider value={{ className: styles.iconUp }}>
                    <div className={`${styles.icon} ${order === 'asc' ? styles.iconActive : ''}`}>
                      <RxTriangleUp />
                    </div>
                  </IconContext.Provider>
                  <IconContext.Provider value={{ className: styles.iconDown }}>
                    <div className={`${styles.icon} ${order === 'desc' ? styles.iconActive : ''}`}>
                      <RxTriangleDown />
                    </div>
                  </IconContext.Provider>
                </span>
                Price
              </div>
            </th>
            <th onClick={() => handleSortingChange('market_cap')} className={styles.th}>
              <div className={styles.thWrap}>
                <span
                  className={`${styles.toggle} ${
                    visible && sortField === 'market_cap' ? styles.visible : ''
                  }`}>
                  <IconContext.Provider value={{ className: styles.iconUp }}>
                    <div className={`${styles.icon} ${order === 'asc' ? styles.iconActive : ''}`}>
                      <RxTriangleUp />
                    </div>
                  </IconContext.Provider>
                  <IconContext.Provider value={{ className: styles.iconDown }}>
                    <div className={`${styles.icon} ${order === 'desc' ? styles.iconActive : ''}`}>
                      <RxTriangleDown />
                    </div>
                  </IconContext.Provider>
                </span>
                Market Cap
              </div>
            </th>
            <th onClick={() => handleSortingChange('total_volume')} className={styles.th}>
              <div className={styles.thWrap}>
                <span
                  className={`${styles.toggle} ${
                    visible && sortField === 'total_volume' ? styles.visible : ''
                  }`}>
                  <IconContext.Provider value={{ className: styles.iconUp }}>
                    <div className={`${styles.icon} ${order === 'asc' ? styles.iconActive : ''}`}>
                      <RxTriangleUp />
                    </div>
                  </IconContext.Provider>
                  <IconContext.Provider value={{ className: styles.iconDown }}>
                    <div className={`${styles.icon} ${order === 'desc' ? styles.iconActive : ''}`}>
                      <RxTriangleDown />
                    </div>
                  </IconContext.Provider>
                </span>
                Volume
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>{renderItems()}</tbody>
      </table>
    </div>
  );
};

export default Coins;
