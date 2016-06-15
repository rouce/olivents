import { Meteor } from "meteor/meteor";
import { Events, Messages } from "../lib/collections";

Meteor.publish("users", () => {
  return Meteor.users.find({}, { fields: { profile: 1 } });
});

Meteor.publishComposite("events", () => {
  if(!this.userId){
    return;
  }

  return {
    find(){
      return Events.find({ userIds: this.userId });
    },
    children: [
      {
        find(event){
          return Messages.find({ eventId: chat._id });
        }
      },
      {
        find(event){
          const query = { _id: { $in: event.userIds } };
          const options = { fields: { profile: 1 } };

          return Meteor.users.find(query, options);
        }
      }
    ]
  };
});
