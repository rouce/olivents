import { Meteor } from "meteor/meteor";
import { Events, Messages } from "../lib/collections";

Meteor.publish("users", () => {
  return Meteor.users.find({}, { fields: { profile: 1 } });
});

Meteor.publishComposite("events", () => {
  /*
  if(!this.userId){
    return;
  }
  */

  return {
    find(){
      return Events.find({ userIds: "J3HDHRxWTAN7K4hcR" });
    },
    children: [
      {
        find(event){
          return Messages.find({ eventId: event._id });
        }
      }
    ]
  };
});
