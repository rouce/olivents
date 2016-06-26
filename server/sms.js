import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { SMS } from "meteor/okland:accounts-phone";

if(Meteor.settings){
  if(Meteor.settings.ACCOUNTS_PHONE){
    Accounts._options.adminPhoneNumbers = Meteor.settings.ACCOUNTS_PHONE.ADMIN_NUMBERS;
    Accounts._options.phoneVerificationMasterCode = Meteor.settings.ACCOUNTS_PHONE.MASTER_CODE;
  }

  if(Meteor.settings.TWILIO){
    SMS.twilio = {
      FROM: Meteor.settings.TWILIO.FROM,
      ACCOUNT_SID: Meteor.settings.TWILIO.ACCOUNT_SID,
      AUTH_TOKEN: Meteor.settings.TWILIO.AUTH_TOKEN,
    }
    SMS.phoneTemplates = {
      from: Meteor.settings.TWILIO.FROM,
      text: (user, code) => {
        return "Your verification code: " + code;
      }
    };
  }
}
