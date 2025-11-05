import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { updateUser } from "@/actions/user/update-user";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";

import { recentLeadSchema } from "./schema";

const formSchema = z.object({
  email: z.string().min(1).email(),
  role: z.enum(["admin", "guest"]),
  verified: z.boolean(),
});

export function UpdateUser({ item }: { item: z.infer<typeof recentLeadSchema> }) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: item.email,
      role: item.role,
      verified: item.verified,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const data = {
        id: item.id,
        email: values.email,
        role: values.role,
        verified: values.verified,
      };

      console.log(data);

      const res = await updateUser(data);

      toast.success(res.message ?? "Update data successful!");

      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          Updated
        </DropdownMenuItem>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="mb-3 gap-1">
          <DrawerTitle>Detailed Information</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
            <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input {...field} id="email" placeholder="John@gmail.com" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="role">Role</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>role</SelectLabel>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="guest">guest</SelectItem>
                              <SelectItem value="host">host</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="verified"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="verified">Verified</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Switch
                            id="verified"
                            onCheckedChange={field.onChange}
                            checked={field.value}
                            className="color-primary cursor-pointer"
                          />
                          <Label htmlFor="verified" className="cursor-pointer">
                            Verified
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DrawerFooter>
              <Button disabled={loading} type="submit">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
