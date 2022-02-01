export interface TransactionProps {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

export type TransactionInput = Omit<TransactionProps, "id" | "createdAt">;
