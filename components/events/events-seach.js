import { useRef } from 'react';

import { getAllMonths } from '@/dummy_data';
import ButtonComponent from '../ui/button';
import classes from './events-seach.module.css';

const EventsSearchComponent = (props) => {
  const allMonths = getAllMonths();

  const yearInput = useRef();
  const monthInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const selectedYear = yearInput.current.value;
    const selectedMonth = monthInput.current.value;

    props.onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInput}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInput}>
            {allMonths.map((month) => (
              <option key={month.id} value={month.id}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ButtonComponent>Search</ButtonComponent>
    </form>
  );
};

export default EventsSearchComponent;
