import React from 'react';
import Notifications from './Notifications';
import Confirm from './Confirm';
import Modals from './Modals';

class EventsListener extends React.Component {
  render() {
    return (
      <>
        <Confirm />
        <Notifications />
        <Modals />
      </>
    );
  }
}

export default EventsListener;
