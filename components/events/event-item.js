import Link from 'next/link';

import ButtonComponent from '../ui/button';
// Icons
import DateIcon from '@/public/icons/date-icon';
import ArrowIcon from '@/public/icons/arrow-right-icon';
import AddressIcon from '@/public/icons/address-icon';

import classes from './event-item.module.css';

const EventItem = (props) => {
  const { id, title, location, date, image } = props;

  const formatDate = new Date(date).toLocaleDateString('pt-mz', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatLocation = location.replace(', ', '\n');

  const optinLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={'/' + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formatDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formatLocation}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <ButtonComponent link={optinLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowIcon />
            </span>
          </ButtonComponent>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
