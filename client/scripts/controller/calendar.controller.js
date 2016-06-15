import { Meteor } from "meteor/meteor";
import { Controller } from "angular-ecmascript/module-helpers";
import Angular from "angular";

export default class CalendarCtrl extends Controller {
  constructor(){
    super(...arguments);

    var ctrl = this;

    Angular.element(document).ready(() =>{
      $("#eventsCalendar").fullCalendar({
        dayClick(date){
          ctrl.addEvent(date);
        },
      });
    });
  }

  addEvent(date){
    this.NewChat.showModal();
  }
}

CalendarCtrl.$inject = [ "NewChat" ];
