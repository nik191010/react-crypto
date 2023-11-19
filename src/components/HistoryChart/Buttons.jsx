import React from 'react';
import { chartDays } from '../../config/data';

const Buttons = () => {
  const [active, setActive] = React.useState();

  // Sets active button
  const handleClick = (event) => {
    event.preventDefault();
    setActive(event.target.id);
  };

  const buttons = chartDays.map((day, index) => {
    return (
      <button
        key={day.index}
        className={active === day.id ? 'active' : undefined}
        id={day.index}
        onClick={handleClick}>
        {day.label}
      </button>
    );
  });
  return <div>{buttons}</div>;
};

export default Buttons;
