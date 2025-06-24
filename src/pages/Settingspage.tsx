import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Link } from 'lucide-react';

import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Define the validation schema for the profile form
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  // Initialize the form with react-hook-form and Zod
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Doe",
      email: "alex.doe@example.com",
    },
    mode: "onChange",
  });

  // Handler for form submission
  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log("Saving profile data:", values);
    toast.success("Profile updated successfully!", {
      description: "Your changes have been saved.",
    });
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex flex-col flex-1">
            <main className="flex-1 flex-col gap-4 p-4 pt-20 md:gap-8 md:p-8 md:pt-20 lg:pl-72">
              <div className="mx-auto grid w-full max-w-4xl gap-6">
                <h1 className="font-heading text-3xl font-semibold text-foreground">Settings</h1>
                
                {/* Account Information Card */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-heading">Account Information</CardTitle>
                    <CardDescription>Manage your personal details.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} className="bg-input border-border" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} className="bg-input border-border" />
                              </FormControl>
                              <FormDescription>
                                This is the email used for login and notifications.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Save Changes
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                {/* Brokerage Connections Card */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-heading">Brokerage Connections</CardTitle>
                    <CardDescription>Connect your brokerage accounts to sync your portfolio.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex items-center justify-between rounded-lg border border-border bg-input p-4">
                        <div className="flex items-center gap-4">
                            <img src="https://logo.clearbit.com/fidelity.com" alt="Fidelity logo" className="h-8 w-8 rounded-full" />
                            <div>
                                <p className="font-medium text-foreground">Fidelity</p>
                                <p className="text-sm text-muted-foreground">Connected on July 25, 2024</p>
                            </div>
                        </div>
                        <Button variant="destructive">Disconnect</Button>
                     </div>
                     <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 hover:text-accent">
                        <Link className="mr-2 h-4 w-4" />
                        Connect New Brokerage
                     </Button>
                  </CardContent>
                </Card>

                {/* Notification Preferences Card */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="font-heading">Notification Preferences</CardTitle>
                    <CardDescription>Customize the alerts you receive.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="price-alerts" className="flex flex-col space-y-1">
                            <span className="font-medium">Price Alerts</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Get notified when a stock in your watchlist hits a target price.
                            </span>
                        </Label>
                        <Switch id="price-alerts" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="market-news" className="flex flex-col space-y-1">
                            <span className="font-medium">Breaking Market News</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive alerts for major market-moving news.
                            </span>
                        </Label>
                        <Switch id="market-news" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="portfolio-updates" className="flex flex-col space-y-1">
                            <span className="font-medium">Daily Portfolio Summary</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                A daily digest of your portfolio's performance.
                            </span>
                        </Label>
                        <Switch id="portfolio-updates" />
                    </div>
                  </CardContent>
                </Card>

              </div>
            </main>
            <div className="lg:pl-64">
              <Footer />
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;