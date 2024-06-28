import { Replace } from 'src/utils/replace';
import { IAccount } from '../interfaces/IAccount';
import { randomUUID } from 'crypto';
import { AccountType } from '@prisma/client';

export class Account {
  private props: IAccount;
  private _id: string;

  constructor(props: Replace<IAccount, { createdAt?: Date }>, id?: string) {
    this.props = { ...props, createdAt: props.createdAt || new Date() };
    this._id = id || randomUUID();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get type() {
    return this.props.type;
  }

  get balance() {
    return this.props.balance;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set type(type: AccountType) {
    this.props.type = type;
  }

  set balance(balance: number) {
    this.props.balance = balance;
  }
}
