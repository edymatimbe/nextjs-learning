import { getFeaturedEvents } from '@/utils';
import EventList from '@/components/events/event-list';

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.featuredEvents} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featured = await getFeaturedEvents();

  return { props: { featuredEvents: featured }, revalidate: 100 };
};

export default HomePage;
