import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { SMS } from "meteor/accounts-base";

if(Meteor.settings && Meteor.settings.ACCOUNTS_PHONE){
  Accounts._options.adminPhoneNumbers = Meteor.settings.ACCOUNTS_PHONE.ADMIN_NUMBERS;
  Accounts._options.phoneVerificationMasterCode = Meteor.settings.ACCOUNTS_PHONE.MASTER_CODE;

  SMS.twilio = {
    FROM: Meteor.settings.twilio.FROM,
    ACCOUNT_SID: Meteor.settings.twilio.ACCOUNT_SID,
    AUTH_TOKEN: Meteor.settings.twilio.AUTH_TOKEN,
  }
}
