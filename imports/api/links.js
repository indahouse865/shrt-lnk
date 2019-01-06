import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('linksPublish', function () {
        return Links.find( { userId: this.userId} );
    });
}