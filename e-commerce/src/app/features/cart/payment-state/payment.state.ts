// payment.state.ts
export interface PaymentState {
  clientSecret: string | null;
  totalAmount: number | null;
  isLoading: boolean;
  error: string | null;
}

export const initialPaymentState: PaymentState = {
  clientSecret: null,
  totalAmount: null,
  isLoading: false,
  error: null,
};
