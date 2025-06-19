import React from 'react';

// Custom Components
import SavingsGoalCard from '@/components/SavingsGoalCard';
import TransactionListItem from '@/components/TransactionListItem';

// Shadcn/ui Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"; // Assuming Chart uses recharts
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, TrendingUp } from 'lucide-react';

// Placeholder data type for transactions, assuming custom component defines 'TransactionType'
type TransactionType = 'income' | 'expense' | 'transfer';

const chartData = [
  { month: "Jan", spending: 50, income: 80 },
  { month: "Feb", spending: 70, income: 90 },
  { month: "Mar", spending: 60, income: 75 },
  { month: "Apr", spending: 80, income: 100 },
];

const DashboardPage = () => {
  const [isLoading, setIsLoading] = React.useState(true); // Simulate loading

  React.useEffect(() => {
    console.log('DashboardPage loaded');
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const transactions: { description: string; amount: number; date: string; type: TransactionType; category?: string }[] = [
    { description: "Pocket Money", amount: 20.00, date: new Date().toISOString(), type: 'income', category: 'Allowance' },
    { description: "Ice Cream", amount: 3.50, date: new Date(Date.now() - 86400000).toISOString(), type: 'expense', category: 'Food' },
    { description: "Birthday Gift", amount: 50.00, date: new Date(Date.now() - 172800000).toISOString(), type: 'income', category: 'Gifts' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src="https://via.placeholder.com/100/007bff/ffffff?Text=User" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-600">Here's your financial overview.</p>
          </div>
        </div>
        <Button onClick={() => alert("Navigate to add new transaction/goal")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New
        </Button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Balance Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
            <CardDescription>Your current available funds.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-3/4" />
            ) : (
              <p className="text-4xl font-bold text-blue-600">£66.50</p>
            )}
            {isLoading ? <Skeleton className="h-4 w-1/2 mt-2" /> : <p className="text-sm text-gray-500 mt-1">Last updated: Just now</p>}
          </CardContent>
        </Card>

        {/* Savings Goals Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Track your progress towards your goals.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => alert("Navigate to create savings goal")}>Create Goal</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </>
            ) : (
              <>
                <SavingsGoalCard
                  title="New Video Game"
                  currentAmount={35}
                  targetAmount={60}
                  description="Saving up for the latest release!"
                  onViewDetails={() => alert("View Game Goal Details")}
                />
                <SavingsGoalCard
                  title="Summer Trip Fund"
                  currentAmount={150}
                  targetAmount={500}
                  description="Adventure awaits!"
                  onViewDetails={() => alert("View Trip Goal Details")}
                />
              </>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Transactions Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest account activity.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : transactions.length > 0 ? (
              <ScrollArea className="h-[240px] pr-3">
                <div className="space-y-2">
                  {transactions.map((tx, index) => (
                    <TransactionListItem
                      key={index}
                      description={tx.description}
                      amount={tx.amount}
                      date={tx.date}
                      type={tx.type}
                      category={tx.category}
                      onClick={() => alert(`Transaction: ${tx.description}`)}
                    />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500">No transactions yet!</p>
                <p className="text-sm text-gray-400">Your activity will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Spending Chart Card - (Optional, if Chart component is suitable) */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
            <CardDescription>Your income vs. spending this year (demo).</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-64 w-full" /> : (
              <ChartContainer config={{}} className="h-[250px] w-full">
                <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="income" fill="var(--color-income, #16a34a)" radius={4} />
                  <Bar dataKey="spending" fill="var(--color-spending, #dc2626)" radius={4} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;