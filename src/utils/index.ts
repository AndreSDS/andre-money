import { TransactionProps } from "../interfaces";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

export function getCurrentMonth() {
  let now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

export function filterListByMonth(
  listTransactions: TransactionProps[],
  date: string
): TransactionProps[] {
  let newList: TransactionProps[] = [];
  const [year, month] = date.split("-");

  newList = listTransactions.filter(({ createdAt }) => {
    const currentDate = new Date(createdAt);
    
    return (
      currentDate.getFullYear() === parseInt(year) &&
      currentDate.getMonth() + 1 === parseInt(month)
    );
  });
  
  return newList;
}
