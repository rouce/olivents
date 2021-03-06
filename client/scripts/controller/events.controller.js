import { Controller } from "angular-ecmascript/module-helpers";
import Moment from "moment";

import { Events } from "../../../lib/collections";

export default class EventsCtrl extends Controller {
  constructor(){
    super(...arguments);

    this.helpers({
      data(){
        return Events.find();
      }
    });

  }
}
