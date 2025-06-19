import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import SavingsGoalCard from '@/components/SavingsGoalCard';
import EducationalContentBlock from '@/components/EducationalContentBlock';

// Shadcn/ui Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, BookOpen } from 'lucide-react';

const savingsGoalSchema = z.object({
  goalName: z.string().min(3, { message: "Goal name is too short." }),
  targetAmount: z.coerce.number().positive({ message: "Target amount must be positive." }),
  category: z.string().optional(),
});
type SavingsGoalFormValues = z.infer<typeof savingsGoalSchema>;

const spendingChartData = [
  { category: "Food", value: 400, fill: "#8884d8" },
  { category: "Entertainment", value: 300, fill: "#82ca9d" },
  { category: "Transport", value: 200, fill: "#ffc658" },
  { category: "Shopping", value: 250, fill: "#ff8042" },
];

const educationalContent = [
  {
    title: "Understanding Budgets",
    summary: "Learn how to create a simple budget to manage your money effectively and save more.",
    imageUrl: "https://via.placeholder.com/400x200/E0F2F7/37474F?text=Budgeting+101",
    linkUrl: "#", category: "Budgeting"
  },
  {
    title: "The Power of Saving Early",
    summary: "Discover why starting to save early can make a big difference in your financial future.",
    imageUrl: "https://via.placeholder.com/400x200/FFF9C4/F57F17?text=Saving+Early",
    linkUrl: "#", category: "Saving Tips"
  },
];

const FinancialToolsPage = () => {
  const [savingsGoals, setSavingsGoals] = useState([
    { title: "New Headphones", currentAmount: 75, targetAmount: 150, description: "For better music quality" },
    { title: "Concert Tickets", currentAmount: 20, targetAmount: 100, description: "My favorite band!" },
  ]);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);

  const form = useForm<SavingsGoalFormValues>({
    resolver: zodResolver(savingsGoalSchema),
    defaultValues: { goalName: "", targetAmount: 0, category: "" },
  });

  const onAddGoalSubmit: SubmitHandler<SavingsGoalFormValues> = (data) => {
    console.log('New Savings Goal:', data);
    setSavingsGoals(prev => [...prev, { title: data.goalName, currentAmount: 0, targetAmount: data.targetAmount, description: `Category: ${data.category || 'General'}` }]);
    form.reset();
    setIsGoalDialogOpen(false);
  };

  console.log('FinancialToolsPage loaded');

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Financial Tools</h1>
        <p className="text-gray-600">Manage your savings, understand spending, and learn more.</p>
      </header>

      <Tabs defaultValue="savings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2">
          <TabsTrigger value="savings">My Savings</TabsTrigger>
          <TabsTrigger value="insights">Spending Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="savings" className="mt-6">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Your Savings Goals</h2>
              <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
                <DialogTrigger asChild>
                  <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Goal</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Savings Goal</DialogTitle>
                    <DialogDescription>Set a target and start saving!</DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onAddGoalSubmit)} className="space-y-4 py-4">
                      <FormField
                        control={form.control}
                        name="goalName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Goal Name</FormLabel>
                            <FormControl><Input placeholder="e.g., Summer Vacation" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="targetAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Amount (£)</FormLabel>
                            <FormControl><Input type="number" placeholder="e.g., 500" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category (Optional)</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="travel">Travel</SelectItem>
                                  <SelectItem value="gadget">Gadget</SelectItem>
                                  <SelectItem value="event">Event</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Create Goal</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            {savingsGoals.length > 0 ? (
              <ScrollArea className="h-[400px] pr-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savingsGoals.map((goal, index) => (
                    <SavingsGoalCard
                      key={index}
                      title={goal.title}
                      currentAmount={goal.currentAmount}
                      targetAmount={goal.targetAmount}
                      description={goal.description}
                      onViewDetails={() => alert(`Details for ${goal.title}`)}
                    />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-gray-500 text-center py-8">No savings goals yet. Create one to get started!</p>
            )}
          </section>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Spending Breakdown</h2>
            <div className="bg-white p-6 rounded-lg shadow mb-8 h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={spendingChartData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
                    {spendingChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <h2 className="text-2xl font-semibold mb-6 mt-10">Learn & Grow <BookOpen className="inline h-6 w-6 ml-1 text-blue-600"/></h2>
             <ScrollArea className="h-[450px] pr-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educationalContent.map((content, index) => (
                    <EducationalContentBlock
                    key={index}
                    title={content.title}
                    summary={content.summary}
                    imageUrl={content.imageUrl}
                    linkUrl={content.linkUrl}
                    category={content.category}
                    />
                ))}
                </div>
            </ScrollArea>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialToolsPage;