import React from 'react';
import Notifications from './Notifications';
import Confirm from './Confirm';

class EventsListener extends React.Component {
  render() {
    return (
      <>
        <Confirm />
        <Notifications />
      </>
    );
  }
}

export default EventsListener;
