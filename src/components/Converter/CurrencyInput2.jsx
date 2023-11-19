import React from 'react';
import styles from './Converter.module.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';
import btc from '../../assets/img/icon-btc.svg';
import eth from '../../assets/img/icon-eth.svg';
import eur from '../../assets/img/icon-eur.svg';

const CurrencyInput2 = ({
  handleChange,
  handle,
  handleCurrency2Change,
  handleAmount2Change,
  flagImg,
  flags,
  currency2,
  amount2,
  currentPriceConverter,
  filterItems,
}) => {
  return (
    <div className={styles.converterInput}>
      <div className={styles.parent}>
        <div className={styles.childComponent}>
          <div onClick={handleChange} className={styles.selectElement}>
            {/* Sets initial image to select */}
            <img
              className={styles.converterImg}
              src={!!flagImg ? flagImg : flags[40]?.flags?.svg}
              alt={`CryptoApp:${currency2}`}
            />
            <p>{currency2.toUpperCase()}</p>
            <MdKeyboardArrowDown className={`${styles.iconDown} ${handle ? styles.rotated : ''}`} />
          </div>
          {handle && (
            <ul className={styles.selectValues}>
              <div className={styles.dropDownElement}>
                <img src={btc} alt="alt" />
                <li
                  onClick={(e) => handleCurrency2Change(e.target.innerHTML)}
                  className={styles.selectOption}>
                  BTC
                </li>
              </div>
              <div className={styles.dropDownElement}>
                <img src={eth} alt="alt" />
                <li
                  onClick={(e) => handleCurrency2Change(e.target.innerHTML)}
                  className={styles.selectOption}>
                  ETH
                </li>
              </div>
              <div className={styles.dropDownElement}>
                <img src={eur} alt="alt" />
                <li
                  onClick={(e) => handleCurrency2Change(e.target.innerHTML)}
                  className={styles.selectOption}>
                  EUR
                </li>
              </div>
              {filterItems(currentPriceConverter).map((currency, index) => (
                <div key={index} className={styles.dropDownElement}>
                  <img src={flags[index]?.flags?.svg} alt="alt" />
                  <li
                    onClick={(e) => handleCurrency2Change(e.target.innerHTML)}
                    className={styles.selectOption}>
                    {currency.toUpperCase()}
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.csInputWrapper}>
          <input
            pattern="[0-9]+"
            inputMode="decimal"
            className={styles.csInput}
            type="text"
            value={amount2}
            onChange={(e) => handleAmount2Change(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput2;
