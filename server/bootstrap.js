import Moment from "moment";
import { Meteor } from "meteor/meteor";
import { Events, Messages } from "../lib/collections";

Meteor.startup(function(){
  if(Events.find().count() !== 0){
    return;
  }

  Messages.remove({});

  const messages = [
    {
      text: "hello 1",
      timestamp: Moment().subtract(1, "hours").toDate()
    },
    {
      text: "hello 2",
      timestamp: Moment().subtract(2, "hours").toDate()
    },
  ];

  messages.forEach((m) => {
    Messages.insert(m);
  });

  const events = [
    {
      name: "geburi 1",
      picture: "https://randomuser.me/api/portraits/thumb/women/4.jpg"
    },
    {
      name: "Argovia",
      picture: "https://randomuser.me/api/portraits/thumb/women/3.jpg"
    },
  ];

  events.forEach((e) => {
    const message = Messages.findOne({ eventId: { $exists: false } });
    e.lastMessage = message;
    const eventId = Events.insert(e);
    Messages.update(message._id, { $set: { eventId } });
  });
});
