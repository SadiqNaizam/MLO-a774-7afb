import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'; // Icons for income/expense

type TransactionType = 'income' | 'expense' | 'transfer';

interface TransactionListItemProps {
  description: string;
  amount: number;
  date: string; // Consider using Date object and formatting it
  type: TransactionType;
  category?: string; // Optional
  onClick?: () => void; // Optional click handler
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  description,
  amount,
  date,
  type,
  category,
  onClick,
}) => {
  const isIncome = type === 'income';
  const amountColor = isIncome ? 'text-green-600' : (type === 'expense' ? 'text-red-600' : 'text-gray-700');
  const IconComponent = isIncome ? ArrowUpCircle : (type === 'expense' ? ArrowDownCircle : null);

  console.log("Rendering TransactionListItem:", description);

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors",
        onClick ? "cursor-pointer" : ""
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className="flex items-center space-x-3">
        {IconComponent && <IconComponent className={cn("h-6 w-6 flex-shrink-0", amountColor)} />}
        <div>
          <p className="font-medium text-sm">{description}</p>
          <p className="text-xs text-gray-500">
            {new Date(date).toLocaleDateString()} {category && `• ${category}`}
          </p>
        </div>
      </div>
      <div className={cn("font-semibold text-sm", amountColor)}>
        {isIncome ? '+' : (type === 'expense' ? '-' : '')}${amount.toFixed(2)}
      </div>
    </div>
  );
};

export default TransactionListItem;