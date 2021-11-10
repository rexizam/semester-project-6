// ** Realm-Web
import * as Realm from 'realm-web';

export const getRealmService = () => {
  return Realm.getApp(process.env.REACT_APP_REALM_APP_ID)
}