import EventList from '@/components/events/event-list';
import EventsSearchComponent from '@/components/events/events-seach';
import { getAllEvents } from '@/utils';
import { useRouter } from 'next/router';

const EventsPage = (props) => {
  const router = useRouter();

  const filteredSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <EventsSearchComponent onSearch={filteredSearch} />
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
  };
};

export default EventsPage;
