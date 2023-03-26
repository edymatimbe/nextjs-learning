import { useRouter } from 'next/router';
import { getFilteredEvents } from '@/utils';
import useSWR from 'swr';
import EventList from '@/components/events/event-list';
import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import ButtonComponent from '@/components/ui/button';
import ErrorAlert from '@/components/error-alert/error-alert';

const FIlteredPage = (props) => {
  const [loadEvents, setLoadEvents] = useState();
  // const { hasError, events } = props;
  const router = useRouter();

  const filterQuery = router.query.slug;

  const { data, error } = useSWR(
    'https://nextjs-app-2e0a0-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadEvents(events);
    }
  }, [data]);

  if (!loadEvents) {
    return <div className="center">Loading...</div>;
  }

  //

  const numYear = Number(filterQuery[0]);
  const numMonth = Number(filterQuery[1]);

  let filteredEvents = loadEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No filter found</p>
        </ErrorAlert>
        <div className="center">
          <ButtonComponent link="/events">Back To All Events</ButtonComponent>
        </div>
      </Fragment>
    );
  }

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

// export const getServerSideProps = async (context) => {
//   const { params } = context;

//   const filterQuery = params.slug;

//   const numYear = Number(filterQuery[0]);
//   const numMonth = Number(filterQuery[1]);

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//     },
//   };
// };

export default FIlteredPage;
