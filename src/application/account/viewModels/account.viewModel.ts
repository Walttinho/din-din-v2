import { viewModelPayment } from '../../../application/payment/viewModels/payment.viewModel';

export class viewModelAccount {
  static toHttp({ id, name, type, balance, createdAt, payments }: any) {
    return {
      id,
      name,
      type,
      balance,
      createdAt,
      payments: payments?.map((payment) => viewModelPayment.toHttp(payment)),
    };
  }
}
