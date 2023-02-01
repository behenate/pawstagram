// noinspection JSUnusedGlobalSymbols

import { collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { User } from '../types/User';

export default async function queryUser(userId: string) {
  const users = collection(firestore, 'users');
  const usersFetched = await getDoc(doc(users, userId));
  return usersFetched.data() as User;
}
