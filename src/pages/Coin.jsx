import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import HistoryChart from '../components/HistoryChart';
import { abbrNum } from '../config/hooks-helpers';
import Converter from '../components/Converter';
import ReadMore from '../components/ReadMore';

const Coin = () => {
  const params = useParams();
  const [coin, setCoin] = React.useState({});
  const description = coin?.description?.en;
  const rank = coin.market_cap_rank;
  const image = coin.image?.small;
  const name = coin.name;
  const symbol = coin.symbol?.toUpperCase();
  const currentPriceConverter = coin?.market_data?.current_price;
  const currentPrice = coin.market_data?.current_price?.usd.toLocaleString('en-US');
  const change1h = coin.market_data?.price_change_percentage_1h_in_currency?.usd.toFixed(1);
  const change24h = coin.market_data?.price_change_percentage_24h_in_currency?.usd.toFixed(1);
  const change7d = coin.market_data?.price_change_percentage_7d_in_currency?.usd.toFixed(1);
  const change14d = coin.market_data?.price_change_percentage_14d_in_currency.usd?.toFixed(1);
  const change30d = coin.market_data?.price_change_percentage_30d_in_currency.usd?.toFixed(1);
  const change1y = coin.market_data?.price_change_percentage_1y_in_currency.usd?.toFixed(1);
  const low24h = coin.market_data?.low_24h?.usd.toLocaleString('en-US');
  const high24h = coin.market_data?.high_24h?.usd.toLocaleString('en-US');
  const marketCap = coin.market_data?.market_cap?.usd;
  const circulatingSupply = coin.market_data?.circulating_supply.toLocaleString('en-US');
  const url = `${process.env.REACT_APP_API_COINS_URL}/${params.coinId}`;

  // Fetches data for a particular coin
  React.useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoin(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // If there's no any value, then sets it to 0
  const checkVal = (val) => {
    return !val ? 0 : val;
  };

  return (
    <div className="coin-wrapper">
      <div className="top">
        <div className="top__left">
          <div className="top__rank">Rank #{rank}</div>
          <div className="top__desc">
            <img className="top__logo" src={image} alt={name} />
            <div className="top__desc-wrap">
              <h1 className="top__title">{name}</h1>
              <span className="top__short"> • {symbol}</span>
            </div>
          </div>
        </div>
        <div className="top__right">
          <p className="top__price">${currentPrice}</p>
          <span
            className={`top__change change-top ${
              checkVal(change24h) >= 0 ? 'change-top__up' : 'change-top__down'
            }`}>
            <IconContext.Provider value={{ className: 'change-top__icon' }}>
              {checkVal(change24h) >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            </IconContext.Provider>
            {checkVal(change24h).toString().replace('-', '')}%
          </span>
        </div>
      </div>
      <HistoryChart />
      <div className="coin-percents">
        <div className="coin-percent">
          <p className="coin-percent__time">1h</p>
          <span
            className={`top__change change-top ${
              checkVal(change1h) >= 0 ? 'change-top__up' : 'change-top__down'
            }`}>
            <IconContext.Provider value={{ className: 'change-top__icon' }}>
              {checkVal(change1h) >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            </IconContext.Provider>
            {checkVal(change1h).toString().replace('-', '')}%
          </span>
        </div>
        <div className="coin-percent">
          <p className="coin-percent__time">24h</p>
          <span
            className={`top__change change-top ${
              checkVal(change24h) >= 0 ? 'change-top__up' : 'change-top__down'
            }`}>
            <IconContext.Provider value={{ className: 'change-top__icon' }}>
              {checkVal(change24h) >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            </IconContext.Provider>
            {checkVal(change24h).toString().replace('-', '')}%
          </span>
        </div>
        <div className="coin-percent">
          <p className="coin-percent__time">7d</p>
          <span
            className={`top__change change-top ${
              checkVal(change7d) >= 0 ? 'change-top__up' : 'change-top__down'
            }`}>
            <IconContext.Provider value={{ className: 'change-top__icon' }}>
              {checkVal(change7d) >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            </IconContext.Provider>
            {checkVal(change7d).toString().replace('-', '')}%
          </span>
        </div>
        <div className="coin-percent">
          <p className="coin-percent__time">14d</p>
          <span
            className={`top__change change-top ${
              checkVal(change14d) >= 0 ? 'change-top__up' : 'change-top__down'
            }`}>
            <IconContext.Provider value={{ className: 'change-top__icon' }}>
              {checkVal(change14d) >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            </IconContext.Provider>
            {checkVal(change14d).toString().replace('-', '')}%
          </span>
        </div>
        <div className="coin-percent">
          <p className="coin-percent__time">30d</p>
          <span
            className={`top__change change-top ${
              checkVal(change30d) >= 0 ? 'change-top__up' : 'change-top__down'
            }`}>
            <IconContext.Provider value={{ className: 'change-top__icon' }}>
              {checkVal(change30d) >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            </IconContext.Provider>
            {checkVal(change30d).toString().replace('-', '')}%
          </span>
        </div>
        <div className="coin-percent">
          <p className="coin-percent__time">1y</p>
          <span
            className={`top__change change-top ${
              checkVal(change1y) >= 0 ? 'change-top__up' : 'change-top__down'
            }`}>
            <IconContext.Provider value={{ className: 'change-top__icon' }}>
              {checkVal(change1y) >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            </IconContext.Provider>
            {checkVal(change1y).toString().replace('-', '')}%
          </span>
        </div>
      </div>
      <div className="stats">
        <h2 className="stats__title">Market Stats</h2>
        <div className="stats__wrappper">
          <div className="stats__top">
            <div className="stats__amount">
              <p className="stats__amount-title">24 Hour Low</p>
              <p className="stats__amount-number">${low24h}</p>
            </div>
            <div className="stats__amount">
              <p className="stats__amount-title">24 Hour High</p>
              <p className="stats__amount-number">${high24h}</p>
            </div>
            <div className="stats__amount">
              <p className="stats__amount-title">Market Cap</p>
              <p className="stats__amount-number">${abbrNum(marketCap, 0)}</p>
            </div>
            <div className="stats__amount">
              <p className="stats__amount-title">Circulating Supply</p>
              <p className="stats__amount-number">{circulatingSupply}</p>
            </div>
          </div>
          <div className="stats__bottom">
            <h2 className="stats__bottom-title">{name} Price Update</h2>
            <p className="stats__bottom-text">
              {name}&nbsp;
              <b>
                price is ${currentPrice},
                <span
                  className={`stats__change change-top ${
                    change24h >= 0 ? 'change-top__up' : 'change-top__down'
                  }`}>
                  <span>{change24h >= 0 ? 'up' : 'down'}</span>
                  <IconContext.Provider value={{ className: 'change-top__icon' }}>
                    {change24h >= 0 ? <RxTriangleUp /> : <RxTriangleDown />}
                  </IconContext.Provider>
                </span>
                {change24h}% &nbsp;
              </b>
              in the last 24 hours, and the live market cap is <b>${abbrNum(marketCap, 0)}</b>. It
              has circulating <b>supply volume of {`${circulatingSupply + ' ' + symbol}`}</b>.
            </p>
          </div>
        </div>
      </div>
      {currentPriceConverter && (
        <Converter
          image={image}
          name={name}
          symbol={symbol}
          currentPriceConverter={currentPriceConverter}
        />
      )}
      <ReadMore name={name} description={description} />
    </div>
  );
};

export default Coin;
