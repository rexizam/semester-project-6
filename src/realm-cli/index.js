// ** Realm-Web
import * as Realm from 'realm-web';

export const getRealmService = () => {
  return Realm.getApp(process.env.REACT_APP_REALM_APP_ID);
};

export const getMongoDB = () => {
  return getRealmService().currentUser.mongoClient(process.env.REACT_APP_MONGO_CLIENT);
};

export const getUserProfilesCollection = () => {
  return getMongoDB().db(process.env.REACT_APP_MONGODB_DB_NAME).collection('user_profiles');
};