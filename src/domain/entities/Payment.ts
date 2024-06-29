import { Replace } from 'src/utils/replace';
import { IPayment } from '../interfaces/IPayment';
import { randomUUID } from 'crypto';

export class Payment {
  private props: IPayment;
  private _id: string;
  constructor(props: Replace<IPayment, { createdAt?: Date }>, id?: string) {
    this.props = { ...props, createdAt: props.createdAt || new Date() };
    this._id = id || randomUUID();
  }

  get id() {
    return this._id;
  }

  get accountId() {
    return this.props.accountId;
  }

  get amount() {
    return this.props.amount;
  }

  get description() {
    return this.props.description;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set accountId(accountId: string) {
    this.props.accountId = accountId;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  set description(description: string) {
    this.props.description = description;
  }
}
