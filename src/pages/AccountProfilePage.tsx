import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { User, Bell, Shield, HelpCircle, LogOut, Edit3 } from 'lucide-react';

const profileSchema = z.object({
  username: z.string().min(3, "Username too short"),
  email: z.string().email("Invalid email address"),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

const pinChangeSchema = z.object({
  currentPin: z.string().length(4, "PIN must be 4 digits"),
  newPin: z.string().length(4, "PIN must be 4 digits"),
  confirmNewPin: z.string().length(4, "PIN must be 4 digits"),
}).refine(data => data.newPin === data.confirmNewPin, {
  message: "New PINs don't match",
  path: ["confirmNewPin"],
});
type PinChangeFormValues = z.infer<typeof pinChangeSchema>;

const AccountProfilePage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: "YouthUser123", email: "user@example.com" },
  });

  const pinChangeForm = useForm<PinChangeFormValues>({
    resolver: zodResolver(pinChangeSchema),
    defaultValues: { currentPin: "", newPin: "", confirmNewPin: "" },
  });

  const onProfileSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log('Profile Update:', data);
    // Update logic here
    setIsProfileDialogOpen(false);
  };

  const onPinChangeSubmit: SubmitHandler<PinChangeFormValues> = (data) => {
    console.log('PIN Change Request:', data);
    // PIN change logic here
    pinChangeForm.reset();
    setIsPinDialogOpen(false);
    alert("PIN changed successfully (demo)!");
  };

  console.log('AccountProfilePage loaded');

  const notifications = [
    { id: 1, title: "New Badge Unlocked!", message: "You've earned the 'Super Saver' badge.", read: false, date: "2 days ago" },
    { id: 2, title: "Weekly Summary", message: "Your weekly spending report is ready.", read: true, date: "5 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-8 flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://via.placeholder.com/150/007BFF/FFFFFF?Text=YU" alt="User Avatar" />
          <AvatarFallback>YU</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Alex Ryder</h1>
          <p className="text-gray-600">alex.ryder@example.com</p>
        </div>
        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon"><Edit3 className="h-4 w-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Edit Profile</DialogTitle></DialogHeader>
                <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4 py-4">
                        <FormField control={profileForm.control} name="username" render={({ field }) => (
                            <FormItem><FormLabel>Username</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={profileForm.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <DialogFooter><Button type="submit">Save Changes</Button></DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
      </header>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5 text-blue-600" /> Account Details</CardTitle>
              <CardDescription>Manage your personal information and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="profile-info">
                  <AccordionTrigger>Profile Information</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p><strong>Username:</strong> {profileForm.getValues().username}</p>
                    <p><strong>Email:</strong> {profileForm.getValues().email}</p>
                    <p><strong>Member Since:</strong> January 1, 2024</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="security">
                  <AccordionTrigger>Security Settings</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <Dialog open={isPinDialogOpen} onOpenChange={setIsPinDialogOpen}>
                        <DialogTrigger asChild><Button variant="outline">Change PIN</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Change PIN</DialogTitle></DialogHeader>
                            <Form {...pinChangeForm}>
                                <form onSubmit={pinChangeForm.handleSubmit(onPinChangeSubmit)} className="space-y-4 py-4">
                                    <FormField control={pinChangeForm.control} name="currentPin" render={({ field }) => (
                                        <FormItem><FormLabel>Current PIN</FormLabel><FormControl><Input type="password" maxLength={4} {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={pinChangeForm.control} name="newPin" render={({ field }) => (
                                        <FormItem><FormLabel>New PIN</FormLabel><FormControl><Input type="password" maxLength={4} {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={pinChangeForm.control} name="confirmNewPin" render={({ field }) => (
                                        <FormItem><FormLabel>Confirm New PIN</FormLabel><FormControl><Input type="password" maxLength={4} {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <DialogFooter><Button type="submit">Change PIN</Button></DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="2fa-switch" className="text-base">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">Enhance your account security.</p>
                        </div>
                        <Switch id="2fa-switch" disabled aria-label="Toggle Two-Factor Authentication (Demo)" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-yellow-500" /> Notifications Hub</CardTitle>
              <CardDescription>Manage your app notifications and alerts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Switch id="notifications-enabled" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                <Label htmlFor="notifications-enabled">Enable Notifications</Label>
              </div>
              <Separator className="my-4" />
              {notificationsEnabled && notifications.length > 0 ? (
                <ul className="space-y-3">
                  {notifications.map(notif => (
                    <li key={notif.id} className={`p-3 rounded-md ${notif.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}`}>
                      <h4 className="font-semibold">{notif.title}</h4>
                      <p className="text-sm text-gray-600">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.date}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">{notificationsEnabled ? "No new notifications." : "Notifications are disabled."}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><HelpCircle className="mr-2 h-5 w-5 text-green-600" /> Help & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Button variant="link" className="p-0 h-auto">FAQs</Button><br/>
                <Button variant="link" className="p-0 h-auto">Contact Support</Button><br/>
                <Button variant="link" className="p-0 h-auto">Terms of Service</Button>
            </CardContent>
          </Card>

          <Alert variant="destructive" className="mt-6">
            <LogOut className="h-4 w-4" />
            <AlertTitle>Account Actions</AlertTitle>
            <AlertDescription className="space-y-3 mt-2">
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => alert("Initiate account graduation/closure flow (demo)")}>
                Account Graduation/Closure
              </Button>
              <Button variant="destructive" className="w-full sm:w-auto" onClick={() => alert("Logging out (demo)")}>
                Log Out
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AccountProfilePage;