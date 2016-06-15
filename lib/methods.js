import { Meteor } from "meteor/meteor";
import { Events, Messages } from "../lib/collections";

Meteor.methods({
  newMessage(message){
    if(!this.userId){
      throw new Meteor.Error("not-logged-in", "Must be logged in to send message.");
    }

    check(message, {
      text: String,
      eventId: String
    });

    message.timestamp = new Date();
    message.userId = this.userId;

    const messageId = Messages.insert(message);
    Events.update(message.eventId, { $set: { lastMessage: message } });

    return messageId;
  },
  updateName(name){
    if(!this.userId){
      throw new Meteor.Error("not-logged-in", "Must be logged in to update his name.");
    }

    check(name, String);

    if(name.length === 0){
      throw Meteor.Error("name-required", "Must provide a username");
    }

    return Meteor.users.update(this.userId, { $set: { "profile.name": name } });
  },
  newChat(otherId, name){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(otherId, String);
    const otherUser = Meteor.users.findOne(otherId);

    if (!otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }

    const event = {
      name: name,
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    return Events.insert(event);
  }
});
