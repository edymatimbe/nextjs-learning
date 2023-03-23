import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getEventById } from '@/dummy_data';
import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/error-alert/error-alert';
import ButtonComponent from '@/components/ui/button';

const EventPage = () => {
  const router = useRouter();

  const eventId = router.query.eventid;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div className="center">
        <ErrorAlert>No event Found</ErrorAlert>
        <ButtonComponent link="/events">Return to All Events</ButtonComponent>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  );
};

export default EventPage;
