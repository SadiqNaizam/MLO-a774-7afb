import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import Carousel from '@/components/Carousel';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronLeft, ChevronRight, Mail, ShieldCheck, UserPlus, Wallet } from 'lucide-react';

const personalDetailsSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date of Birth must be in YYYY-MM-DD format." }),
});

const pinSchema = z.object({
  pin: z.string().length(4, { message: "PIN must be 4 digits." }),
  confirmPin: z.string().length(4, { message: "Confirm PIN must be 4 digits." }),
}).refine(data => data.pin === data.confirmPin, {
  message: "PINs don't match",
  path: ["confirmPin"],
});

type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;
type PinFormValues = z.infer<typeof pinSchema>;

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // Welcome, Personal Details, Parental Consent, Account Setup (PIN)

  const personalDetailsForm = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: { fullName: "", dateOfBirth: "" },
  });

  const pinForm = useForm<PinFormValues>({
    resolver: zodResolver(pinSchema),
    defaultValues: { pin: "", confirmPin: "" },
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps + 1)); // +1 to show completion
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const onPersonalDetailsSubmit: SubmitHandler<PersonalDetailsFormValues> = (data) => {
    console.log('Personal Details:', data);
    nextStep();
  };

  const onPinSubmit: SubmitHandler<PinFormValues> = (data) => {
    console.log('PIN Setup:', data);
    nextStep(); // To completion screen
  };

  console.log('OnboardingPage loaded, step:', currentStep);

  const welcomeSlides = [
    <div key="slide1" className="text-center p-4">
      <Wallet className="w-16 h-16 mx-auto mb-4 text-blue-600" />
      <h2 className="text-2xl font-semibold mb-2">Welcome to Your Financial Journey!</h2>
      <p className="text-gray-600">Let's get your account set up. It's quick and easy!</p>
    </div>,
    <div key="slide2" className="text-center p-4">
      <UserPlus className="w-16 h-16 mx-auto mb-4 text-green-600" />
      <h2 className="text-2xl font-semibold mb-2">Safe & Secure</h2>
      <p className="text-gray-600">We prioritize your security every step of the way.</p>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6 md:p-8">
        <Progress value={(currentStep / (totalSteps + 1)) * 100} className="mb-6 w-full" />

        {currentStep === 1 && (
          <section>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Get Started</h1>
            <p className="text-center text-gray-600 mb-6">Welcome! Let's create your account.</p>
            <Carousel slides={welcomeSlides} />
            <Button onClick={nextStep} className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
              Start Onboarding <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </section>
        )}

        {currentStep === 2 && (
          <section>
            <h2 className="text-2xl font-semibold text-center mb-6">Step 1: Personal Details</h2>
            <Form {...personalDetailsForm}>
              <form onSubmit={personalDetailsForm.handleSubmit(onPersonalDetailsSubmit)} className="space-y-4">
                <FormField
                  control={personalDetailsForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Alex Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalDetailsForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>Please use YYYY-MM-DD format.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Next</Button>
              </form>
            </Form>
          </section>
        )}

        {currentStep === 3 && (
          <section>
            <h2 className="text-2xl font-semibold text-center mb-6">Step 2: Parental Consent</h2>
            <Alert variant="default" className="mb-4">
              <Mail className="h-4 w-4" />
              <AlertTitle>Parental Approval Needed</AlertTitle>
              <AlertDescription>
                We need approval from a parent or guardian to continue.
              </AlertDescription>
            </Alert>
            <p className="text-gray-600 mb-4 text-sm">
              Please ask your parent or guardian to help with this step.
            </p>
            <div className="space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Notify Parent</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Notify Parent</DialogTitle>
                    <DialogDescription>
                      Enter your parent's email to send them a consent request. (This is a demo feature)
                    </DialogDescription>
                  </DialogHeader>
                  <Input type="email" placeholder="parent@example.com" className="my-4" />
                  <DialogFooter>
                    <Button onClick={() => { /* Logic to send notification */ console.log("Notify parent clicked"); nextStep(); }}>Send Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Parent is With Me</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Parental Consent</SheetTitle>
                    <SheetDescription>
                      Parent/Guardian: Please review and approve the account creation. (This is a demo feature)
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-700">Details about terms and conditions would go here.</p>
                    <Label htmlFor="parent-approval" className="mt-4 block">I approve this account creation:</Label>
                    <Input type="checkbox" id="parent-approval" className="mt-1"/>
                  </div>
                  <Button onClick={() => { /* Logic for on-device approval */ console.log("Parent approved on device"); nextStep(); }} className="w-full">Approve & Continue</Button>
                </SheetContent>
              </Sheet>
            </div>
          </section>
        )}
        
        {currentStep === 4 && (
          <section>
            <h2 className="text-2xl font-semibold text-center mb-6">Step 3: Identity Verification</h2>
             <Alert variant="default" className="mb-4">
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>Verify Your Identity</AlertTitle>
              <AlertDescription>
                This step helps keep your account secure. (Simplified for demo)
              </AlertDescription>
            </Alert>
            <p className="text-gray-600 mb-4 text-sm">
              In a real app, you might upload an ID or answer security questions. For now, we'll simulate this.
            </p>
            <Button onClick={nextStep} className="w-full bg-blue-600 hover:bg-blue-700">
              Simulate Verification & Continue
            </Button>
          </section>
        )}


        {currentStep === 5 && (
          <section>
            <h2 className="text-2xl font-semibold text-center mb-6">Step 4: Account Setup</h2>
            <Form {...pinForm}>
              <form onSubmit={pinForm.handleSubmit(onPinSubmit)} className="space-y-4">
                <FormField
                  control={pinForm.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Create 4-digit PIN</FormLabel>
                      <FormControl>
                        <Input type="password" maxLength={4} placeholder="••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={pinForm.control}
                  name="confirmPin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm PIN</FormLabel>
                      <FormControl>
                        <Input type="password" maxLength={4} placeholder="••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Set PIN & Finish</Button>
              </form>
            </Form>
          </section>
        )}

        {currentStep > totalSteps + 1 && ( // Corresponds to step 5, which is the completion step
           <section className="text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Onboarding Complete!</h2>
            <p className="text-gray-700 mb-6">Welcome aboard! Your account is ready.</p>
            <Button onClick={() => window.location.href = '/dashboard'} className="w-full bg-green-600 hover:bg-green-700">
              Go to Dashboard
            </Button>
          </section>
        )}

        {currentStep > 1 && currentStep <= totalSteps + 1 && (
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          </div>
        )}
      </div>
       <footer className="text-center text-sm text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Your FinTech App. All rights reserved.
      </footer>
    </div>
  );
};

export default OnboardingPage;