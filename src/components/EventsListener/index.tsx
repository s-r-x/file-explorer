import React from 'react';
import Notifications from './Notifications';
import Confirm from './Confirm';
import Poll from './Poll';

class EventsListener extends React.Component {
  render() {
    return (
      <>
        <Confirm />
        <Notifications />
        <Poll />
      </>
    );
  }
}

export default EventsListener;
