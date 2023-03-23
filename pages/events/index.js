import EventList from '@/components/events/event-list';
import EventsSearchComponent from '@/components/events/events-seach';
import { getAllEvents } from '@/dummy_data';
import { useRouter } from 'next/router';

const EventsPage = () => {
  const allEvents = getAllEvents();
  const router = useRouter();

  const filteredSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <EventsSearchComponent onSearch={filteredSearch} />
      <EventList items={allEvents} />
    </div>
  );
};

export default EventsPage;
