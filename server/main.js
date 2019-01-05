import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import Signup from '../imports/ui/Signup';

Meteor.startup(() => {

    Accounts.validateNewUser((user) => {
        console.log(user);
        const email = user.emails[0].address;

        try {
            new SimpleSchema({
                email: {
                    type: String,
                    regEx: SimpleSchema.RegEx.email
                }
            }).validate( { email } );
        
        } catch (e) {
            throw new Meteor.Error(400, e.message)
        }

        return true;
    });

});

