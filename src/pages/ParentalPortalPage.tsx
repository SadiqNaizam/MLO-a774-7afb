import React, { useState } from 'react';

// Custom Components
import ParentalControlSettingItem from '@/components/ParentalControlSettingItem';

// Shadcn/ui Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users, DollarSign, ShieldAlert, Settings, PlusCircle } from 'lucide-react';

const childSpendingData = [
  { month: "Jan", spent: 30 }, { month: "Feb", spent: 45 }, { month: "Mar", spent: 20 }, { month: "Apr", spent: 50 },
];

const initialControls = [
    { id: 'dailyLimit', label: 'Daily Spending Limit', description: 'Max amount child can spend per day.', isActive: true, value: 20 },
    { id: 'onlinePayments', label: 'Online Payments', description: 'Allow or block online transactions.', isActive: false },
    { id: 'atmWithdrawal', label: 'ATM Withdrawals', description: 'Enable or disable cash withdrawals.', isActive: true },
];

const ParentalPortalPage = () => {
  const [allowanceAmount, setAllowanceAmount] = useState(10); // Weekly allowance
  const [isAllowanceDialogOpen, setIsAllowanceDialogOpen] = useState(false);
  const [tempAllowance, setTempAllowance] = useState(allowanceAmount);

  const [parentalControls, setParentalControls] = useState(initialControls.map(c => ({...c, currentVal: c.value})));

  const handleToggleControl = (id: string, isActive: boolean) => {
    setParentalControls(prev => prev.map(c => c.id === id ? { ...c, isActive } : c));
    console.log(`Control ${id} toggled to ${isActive}`);
  };
  
  const handleSetAllowance = () => {
    setAllowanceAmount(tempAllowance);
    setIsAllowanceDialogOpen(false);
    console.log("Allowance set to:", tempAllowance);
  }

  console.log('ParentalPortalPage loaded');

  const childTransactions = [
    { id: 'tx1', date: '2024-07-20', description: 'Bookstore', amount: 15.99, type: 'expense' },
    { id: 'tx2', date: '2024-07-19', description: 'Weekly Allowance', amount: 10.00, type: 'income' },
    { id: 'tx3', date: '2024-07-18', description: 'Cinema Ticket', amount: 8.50, type: 'expense' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center"><Users className="mr-3 h-8 w-8 text-blue-600"/>Parental Portal</h1>
        <p className="text-slate-600">Oversee and manage your child's account activities.</p>
      </header>

      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Child Account Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Child's Account Summary</CardTitle>
              <CardDescription>Alex Ryder - Current Balance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-700">£66.50</p>
              <p className="text-sm text-slate-500 mt-1">Last activity: 2 hours ago</p>
              <Button variant="outline" className="w-full mt-4" onClick={() => alert("View full statement")}>View Full Statement</Button>
            </CardContent>
          </Card>

          {/* Manage Allowance */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center"><DollarSign className="mr-2 h-5 w-5 text-green-600"/>Manage Allowance</CardTitle>
              <CardDescription>Set or adjust weekly/monthly allowance.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">Current: £{allowanceAmount.toFixed(2)} / week</p>
                <Dialog open={isAllowanceDialogOpen} onOpenChange={setIsAllowanceDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full mt-4">
                            <Settings className="mr-2 h-4 w-4"/> Adjust Allowance
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Set Allowance</DialogTitle>
                            <DialogDescription>Enter the new weekly allowance amount for Alex.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <Label htmlFor="allowance">Weekly Allowance (£)</Label>
                            <Input id="allowance" type="number" value={tempAllowance} onChange={(e) => setTempAllowance(parseFloat(e.target.value) || 0)} />
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSetAllowance}>Set Allowance</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
          </Card>
          
          {/* Quick Controls Overview */}
           <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5 text-red-600"/>Quick Controls</CardTitle>
              <CardDescription>Key settings at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {parentalControls.slice(0,2).map(control => (
                     <div key={control.id} className="flex items-center justify-between">
                        <Label htmlFor={control.id} className="text-sm font-medium">{control.label}</Label>
                        <Switch id={control.id} checked={control.isActive} onCheckedChange={(checked) => handleToggleControl(control.id, checked)} />
                    </div>
                ))}
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => document.getElementById('parental-controls-section')?.scrollIntoView({behavior: 'smooth'})}>
                    View All Controls
                </Button>
            </CardContent>
          </Card>


          {/* Recent Activity Table */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity (Alex Ryder)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {childTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.description}</TableCell>
                      <TableCell className="text-right">£{tx.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={tx.type === 'income' ? 'default' : 'secondary'} className={tx.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                          {tx.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Spending Chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Child's Spending Chart (Last 4 Months)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer config={{}} className="w-full h-full">
                <BarChart data={childSpendingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="spent" fill="var(--color-spent, #3b82f6)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Parental Controls Section */}
          <Card className="lg:col-span-3" id="parental-controls-section">
            <CardHeader>
              <CardTitle className="flex items-center"><Settings className="mr-2 h-5 w-5 text-slate-700"/>Parental Controls</CardTitle>
              <CardDescription>Set and manage spending limits, feature access, and more.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full space-y-4">
                <AccordionItem value="spending-limits">
                  <AccordionTrigger className="text-base font-semibold">Spending Limits</AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-3">
                    {parentalControls.filter(c => c.id.includes('Limit')).map(control => (
                        <ParentalControlSettingItem
                            key={control.id}
                            id={control.id}
                            label={control.label}
                            description={`${control.description} Current: £${control.currentVal || 'N/A'}`}
                            isActive={control.isActive}
                            onToggle={handleToggleControl}
                        />
                    ))}
                    {/* Example: Add dialog to edit limit value */}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="feature-access">
                  <AccordionTrigger className="text-base font-semibold">Feature Access</AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-3">
                     {parentalControls.filter(c => !c.id.includes('Limit')).map(control => (
                        <ParentalControlSettingItem
                            key={control.id}
                            id={control.id}
                            label={control.label}
                            description={control.description}
                            isActive={control.isActive}
                            onToggle={handleToggleControl}
                        />
                    ))}
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="requests">
                  <AccordionTrigger className="text-base font-semibold">Pending Requests (0)</AccordionTrigger>
                  <AccordionContent className="pt-3">
                    <p className="text-sm text-slate-500">No pending requests from Alex.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ParentalPortalPage;