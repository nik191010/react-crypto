import React from 'react';
import axios from 'axios';
import btc from '../../assets/img/icon-btc.svg';
import eth from '../../assets/img/icon-eth.svg';
import eur from '../../assets/img/icon-eur.svg';

import styles from './Converter.module.scss';
import CurrencyInput1 from './CurrencyInput1';
import CurrencyInput2 from './CurrencyInput2';

const Converter = ({ image, name, symbol, currentPriceConverter }) => {
  const [amount1, setAmount1] = React.useState(1);
  const [amount2, setAmount2] = React.useState(1);
  const [currency1, setCurrency1] = React.useState(symbol);
  const [currency2, setCurrency2] = React.useState('usd');
  const [flags, setFlags] = React.useState({});
  const [flagImg, setFlagImg] = React.useState('');
  const [handle, setHandle] = React.useState(false);
  const removeList = [
    'bch',
    'bnb',
    'btc',
    'eth',
    'eur',
    'dot',
    'eos',
    'ltc',
    'vef',
    'xag',
    'xau',
    'xdr',
    'xlm',
    'xrp',
    'yfi',
    'bits',
    'link',
    'sats',
  ];

  // Fetches data with countries flags
  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_FLAGS_URL)
      .then((response) => {
        // First, it gets the data and compares the flags object(250 values) with the prices object(currenciesForFlags, ~50 values)
        // so to remove unnecessary values, then sorts it in descending order
        setFlags(
          response.data
            .filter((x) => currenciesForFlags.some((y) => y === x.cca2))
            .sort((a, b) => a.cca2.localeCompare(b.cca2)),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to remove unnecessary coins
  const filterItems = (items) => {
    return Object.keys(items).filter((item) => removeList.indexOf(item) < 0);
  };

  // Removes unnecessary currencies  and  the last letter from the currency abbreviation e.g. USD->US
  // so to be able to compare with the flag object values(US,GB etc)
  const currenciesForFlags = filterItems(currentPriceConverter).map((item) =>
    item.toUpperCase().slice(0, -1),
  );

  // If the object with prices(currentPriceConverter) is loaded, execute calculations with 1
  React.useEffect(() => {
    if (!!currentPriceConverter) {
      handleAmount1Change(1);
    }
  }, [currentPriceConverter]);

  // Number format function
  const format = (number) => {
    return number.toFixed(2);
  };

  // Number format function
  const formatCoins = (number) => {
    return number.toFixed(8);
  };

  // If the value of input is changed, then it executes calculations using
  // value from the 1st input(number) and the 2nd input(number which is fetched
  // from 'currentPriceConverter' and sets the result to the 2nd input
  const handleAmount1Change = (amount1) => {
    setAmount2(format(amount1 * currentPriceConverter[currency2.toLowerCase()]));
    setAmount1(amount1);
  };

  // Everything is the same as in the handleAmount1Change, but for 2nd input
  const handleAmount2Change = (amount2) => {
    setAmount1(formatCoins(amount2 / currentPriceConverter[currency2.toLowerCase()]));
    setAmount2(amount2);
  };

  // Executes calculations also sets the currency when it's changed
  // There are no suitable flags for BTC,ETH and EUR in the flag object,
  // so if the user selects them the separate images are used
  // The function performs a search in the flag object for other currencies
  const handleCurrency2Change = (currency2) => {
    setAmount2(format(amount1 * currentPriceConverter[currency2.toLowerCase()]));
    setCurrency2(currency2);

    switch (currency2) {
      case 'BTC':
        setFlagImg(btc);
        break;
      case 'ETH':
        setFlagImg(eth);
        break;
      case 'EUR':
        setFlagImg(eur);
        break;
      default:
        setFlagImg(
          flags.find((item) => item.cca2 === currency2.toUpperCase().slice(0, -1)).flags.svg,
        );
    }

    handleChange();
  };

  // True/false switcher
  const handleChange = () => {
    setHandle(!handle);
  };

  return (
    <div className={styles.converter}>
      <h2 className={styles.title}>Crypto Converter</h2>
      <div className={styles.wrapper}>
        <CurrencyInput1
          image={image}
          name={name}
          handleAmount1Change={handleAmount1Change}
          amount1={amount1}
          currency1={currency1}
        />
        <CurrencyInput2
          handleChange={handleChange}
          handle={handle}
          handleCurrency2Change={handleCurrency2Change}
          handleAmount2Change={handleAmount2Change}
          flagImg={flagImg}
          flags={flags}
          currency2={currency2}
          amount2={amount2}
          currentPriceConverter={currentPriceConverter}
          filterItems={filterItems}
        />
      </div>
    </div>
  );
};

export default Converter;
