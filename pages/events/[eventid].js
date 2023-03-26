import { Fragment } from 'react';

import { getAllEvents, getEventById } from '@/utils';
import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/error-alert/error-alert';
import ButtonComponent from '@/components/ui/button';

const EventPage = (props) => {
  if (!props.event) {
    return (
      <div className="center">
        <ErrorAlert>No event Found</ErrorAlert>
        <ButtonComponent link="/events">Return to All Events</ButtonComponent>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={props.event.title} />
      <EventLogistics
        date={props.event.date}
        location={props.event.location}
        image={props.event.image}
        imageAlt={props.event.title}
      />
      <EventContent>{props.event.description}</EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const event = params.eventid;

  const getEvent = await getEventById(event);

  return {
    props: {
      event: getEvent,
    },
  };
};

export const getStaticPaths = async () => {
  const allEvents = await getAllEvents();

  const eventURL = allEvents.map((event) => ({
    params: { eventid: event.id },
  }));

  return {
    paths: eventURL,
    fallback: false,
  };
};

export default EventPage;
