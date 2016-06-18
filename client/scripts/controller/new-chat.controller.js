import { Meteor } from "meteor/meteor";
import { Controller } from "angular-ecmascript/module-helpers";
import { Events } from "../../../lib/collections";

export default class NewChatCtrl extends Controller {
  constructor(){
    super(...arguments);

    this.subscribe("users");

    this.helpers({
      users(){
        return Meteor.users.find({ _id: { $ne: this.currentUserId } });
      }
    });
  }

  newChat(userId){
    if(!this.name){
      return this.handleError({ reason: "Eventname is required" });
    }

    this.callMethod("newChat", userId, this.name, (err, eventId) => {
      this.hideNewChatModal();
      if(err){
        return this.handleError(err);
      }
      this.goToChat(eventId);
    });
  }

  hideNewChatModal(){
    this.NewChat.hideModal();
  }

  goToChat(eventId){
    this.$state.go("tab.chat", { eventId });
  }

  handleError(err){
    this.$log.error("New chat creation failed", err);

    this.$ionicPopup.alert({
      title: err.reason || "New chat creation failed",
      template: "Please try again",
      okType: "button-positive button-clear"
    });
  }
}

NewChatCtrl.$inject = [ "$state", "NewChat", "$ionicPopup", "$log" ];
