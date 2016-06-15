import { Meteor } from "meteor/meteor";
import { Controller } from "angular-ecmascript/module-helpers";
import { Events } from "../../../lib/collections";

export default class NewChatCtrl extends Controller {
  constructor(){
    super(...arguments);

    this.helpers({
      users(){
        return Meteor.users.find({ _id: { $ne: this.currentUserId } });
      }
    });
  }

  newChat(userId){
    this.callMethod("newChat", userId, (err, chatId) => {
      this.hideNewChatModal();
      if(err){
        return this.handleError(err);
      }
      this.goToChat(chatId);
    });
  }

  goToChat(chatId){
    this.$state.go("tab.chat", { chatId });
  }

  handleError(err){
    this.$log.error("new chat creation failed", err);

    this.$ionicPopup.alert({
      title: err.reason || "new chat creation failed",
      template: "Please try again",
      okType: "button-positive button-clear"
    });
  }
}

NewChatCtrl.$inject = [ "$state", "NewChat", "$ionicPopup", "$log" ];
