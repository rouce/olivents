import { _ } from "meteor/underscore";
import { Meteor } from "meteor/meteor";
import { Config, Runner } from "angular-ecmascript/module-helpers";

class RoutesConfig extends Config {
  constructor(){
    super(...arguments);

    this.isAuthorized = [ "$auth", this.isAuthorized.bind(this) ];
  }

  configure(){
    this.$stateProvider
      .state("tab", {
        url: "/tab",
        abstract: true,
        templateUrl: "client/templates/tabs.html",
        resolve: {
          user: this.isAuthorized,
          events() {
            return Meteor.subscribe("events");
          }
        }
      })
      .state("tab.events", {
        url: "/events",
        views: {
          "tab-events": {
            templateUrl: "client/templates/events.html",
            controller: "EventsCtrl as events",
          }
        }
      })
      .state("tab.chat", {
        url: "/events/:eventId",
        views: {
          "tab-events": {
            templateUrl: "client/templates/chat.html",
            controller: "ChatCtrl as chat"
          }
        }
      })
      .state("tab.settings", {
        url: "/settings",
        views: {
          "tab-settings": {
            templateUrl: "client/templates/settings.html",
            controller: "SettingsCtrl as settings"
          }
        }
      })
      .state("tab.calendar", {
        url: "/calendar",
        views: {
          "tab-calendar": {
            templateUrl: "client/templates/calendar.html",
            controller: "CalendarCtrl as calendar"
          }
        }
      })
      .state("login", {
        url: "/login",
        templateUrl: "client/templates/login.html",
        controller: "LoginCtrl as loginCtrl"
      })
      .state("confirmation", {
        url: "/confirmation/:phone",
        templateUrl: "client/templates/confirmation.html",
        controller: "ConfirmationCtrl as confirmation"
      })
      .state("profile", {
        url: "/profile",
        templateUrl: "client/templates/profile.html",
        controller: "ProfileCtrl as profile",
        resolve: {
          user: this.isAuthorized
        }
      });

      this.$urlRouterProvider.otherwise("tab/events");
  }

  isAuthorized($auth){
    return $auth.awaitUser();
  }
}

RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];


class RoutesRunner extends Runner {
  run(){
    this.$rootScope.$on("$stateChangeError", (...args) => {
      const err = _.last(args);

      if(err === "AUTH_REQUIRED"){
        this.$state.go("login");
      }
    });
  }
}

RoutesRunner.$inject = [ "$rootScope", "$state" ];

export default [RoutesConfig, RoutesRunner];
