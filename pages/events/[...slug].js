import { useRouter } from 'next/router';
import { getFilteredEvents } from '@/dummy_data';
import EventList from '@/components/events/event-list';
import { Fragment } from 'react';
import ButtonComponent from '@/components/ui/button';
import ErrorAlert from '@/components/error-alert/error-alert';

const FIlteredPage = () => {
  const router = useRouter();

  const filterQuery = router.query.slug;

  if (!filterQuery) {
    return <div className="center">Loading...</div>;
  }

  const numYear = Number(filterQuery[0]);
  const numMonth = Number(filterQuery[1]);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return <p>Invalid data</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event found</p>
        </ErrorAlert>
        <div className="center">
          <ButtonComponent link="/events">Back To All Events</ButtonComponent>
        </div>
      </Fragment>
    );
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FIlteredPage;
