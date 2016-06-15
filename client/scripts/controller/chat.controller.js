import Ionic from "ionic-scripts";
import { Meteor } from "meteor/meteor";
import { _ } from "meteor/underscore";
import { Controller } from "angular-ecmascript/module-helpers";
import { Events, Messages } from "../../../lib/collections";

export default class ChatCtrl extends Controller {
  constructor(){
    super(...arguments);

    this.eventId = this.$stateParams.eventId;
    this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
    this.isCordova = Meteor.isCordova;

    this.helpers({
      data(){
        return Events.findOne(this.eventId);
      },
      messages(){
        return Messages.find({ eventId: this.eventId });
      }
    });

    this.autoScroll();
  }

  sendMessage(){
    if(_.isEmpty(this.message)){
      return;
    }

    this.callMethod("newMessage", {
      text: this.message,
      eventId: this.eventId
    });

    delete this.message;
  }

  autoScroll(){
    let recentMessagesNum = this.messages.length;

    this.autorun(() => {
      const currMessagesNum = this.getCollectionReactively("messages").length;
      const animate = recentMessagesNum != currMessagesNum;
      recentMessagesNum = currMessagesNum;
      this.scrollBottom(animate);
    });
  }

  inputUp(){
    if(this.isIOS){
      this.keyboardHeight = 216;
    }

    this.scrollBottom(true);
  }

  inputDown(){
    if(this.isIOS){
      this.keyboardHeight = 0;
    }

    this.$ionicScrollDelegate.$getByHandle("chatScroll").resize();
  }

  closeKeyboard(){
    if(this.isCordova){
      cordova.plugins.Keyboard.close();
    }
  }

  scrollBottom(animate){
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle("chatScroll").scrollBottom(animate);
    }, 300);
  }
}

ChatCtrl.$inject = ["$stateParams", "$timeout", "$ionicScrollDelegate"];
