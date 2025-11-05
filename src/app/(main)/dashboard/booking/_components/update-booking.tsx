import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { updateBooking } from "@/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

import { recentLeadSchema } from "./schema";

const formSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  totalPrice: z.coerce.number(),
});

export function UpdateBooking({ item }: { item: z.infer<typeof recentLeadSchema> }) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: item.startDate,
      endDate: item.endDate,
      totalPrice: item.totalPrice,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const data = {
        id: item.id,
        startDate: values.startDate,
        endDate: values.endDate,
        totalPrice: values.totalPrice,
      };

      const res = await updateBooking(data);

      toast.success(res.message ?? "Updated data successful!");

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
          Update
        </DropdownMenuItem>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="mb-5 gap-1">
          <DrawerTitle>Detailed information</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
            <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => {
                    const date = field.value ? new Date(field.value) : undefined;

                    return (
                      <FormItem className="flex flex-col gap-3">
                        <FormLabel htmlFor="startDate">Start date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                data-empty={!date}
                                className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                              >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                  field.onChange(selectedDate?.toISOString()); // lưu string ISO nếu schema là string
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => {
                    const date = field.value ? new Date(field.value) : undefined;

                    return (
                      <FormItem className="flex flex-col gap-3">
                        <FormLabel htmlFor="endDate">End date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                data-empty={!date}
                                className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                              >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                  field.onChange(selectedDate?.toISOString());
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="totalPrice"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="totalPrice">Total price</FormLabel>
                      <FormControl>
                        <Input {...field} id="totalPrice" placeholder="488" type="number" />
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
