//Libs
import "angular-animate";
import "angular-meteor";
import "angular-meteor-auth";
import "angular-moment";
import "angular-sanitize";
import "angular-ui-router";
import "ionic-scripts";
import Angular from "angular";
import Loader from "angular-ecmascript/module-loader";
import { Meteor } from "meteor/meteor";

//modules
import Routes from "../routes";

import EventsCtrl from "../controller/events.controller";
import ChatCtrl from "../controller/chat.controller";
import LoginCtrl from "../controller/login.controller";
import ConfirmationCtrl from "../controller/confirmation.controller";
import ProfileCtrl from "../controller/profile.controller";
import SettingsCtrl from "../controller/settings.controller";
import CalendarCtrl from "../controller/calendar.controller";
import NewChatCtrl from "../controller/new-chat.controller";

import NewChatService from "../controller/new-chat.service";

import CalendarFilter from "../filter/calendar.filter";
import InputDirective from "../directives/input.directive";

const App = "Olivents";

Angular.module(App, [
  "angular-meteor",
  "angularMoment",
  "angular-meteor.auth",
  "ionic"
]);

new Loader(App)
  .load(Routes)
  .load(EventsCtrl)
  .load(ChatCtrl)
  .load(LoginCtrl)
  .load(ConfirmationCtrl)
  .load(ProfileCtrl)
  .load(SettingsCtrl)
  .load(CalendarCtrl)
  .load(NewChatCtrl)
  .load(NewChatService)
  .load(InputDirective)
  .load(CalendarFilter);


//startup
if(Meteor.isCordova){
  Angular.element(document).on("deviceready", onReady);
}else{
  Angular.element(document).ready(onReady);
}

function onReady() {
  Angular.bootstrap(document, [App]);
}
