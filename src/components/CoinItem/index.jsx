import React from 'react';
import { Link } from 'react-router-dom';
import { abbrNum } from '../../config/hooks-helpers';
import { IconContext } from 'react-icons';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import AppContext from '../../config/context';

import styles from './CoinItem.module.scss';
import Skeleton from './Skeleton';
import Coin from '../../pages/Coin';

const CoinItem = ({ coins, loading = true }) => {
  const { setSearch } = React.useContext(AppContext);

  const coinName = coins.name;
  const coinShortName = coins.symbol.toUpperCase();
  const marketCap = coins.market_cap;
  const marketCapRank = coins.market_cap_rank;
  const price24 =
    coins.price_change_percentage_24h !== 0
      ? coins.price_change_percentage_24h.toFixed(2)
      : coins.price_change_percentage_24h;
  const coinCurrent = coins.current_price.toFixed(0);
  const volume = coins.total_volume;

  // Clears search input
  const clickHandler = () => {
    setSearch('');
  };

  return loading ? (
    <Skeleton />
  ) : (
    <tr className={styles.row}>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`} element={<Coin />}>
          {marketCapRank}
        </Link>
      </td>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`} element={<Coin />}>
          <div className={styles.logo}>
            <img src={coins.image} alt={coinName} className={styles.pic} />
            <div className={styles.logoDesc}>
              <span className={styles.logoText}>
                {coinName}
                <span> • {coinShortName}</span>
              </span>
            </div>
          </div>
        </Link>
      </td>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`} element={<Coin />}>
          <span className={`${styles.change} ${price24 >= 0 ? styles.up : styles.down}`}>
            <IconContext.Provider value={{ className: styles.icon }}>
              {price24 >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            </IconContext.Provider>
            {price24.toString().replace('-', '')}%
          </span>
        </Link>
      </td>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`} element={<Coin />}>
          ${coinCurrent}
        </Link>
      </td>
      <td className={styles.cell}>
        {/* abbrNum converts long numbers into abbreviated strings(1k,20m,100b)*/}
        <Link onClick={clickHandler} to={`/coin/${coins.id}`} element={<Coin />}>
          ${abbrNum(marketCap, 2)}
        </Link>
      </td>
      <td className={styles.cell}>
        <Link onClick={clickHandler} to={`/coin/${coins.id}`} element={<Coin />}>
          ${abbrNum(volume, 2)}
        </Link>
      </td>
    </tr>
  );
};

export default CoinItem;
