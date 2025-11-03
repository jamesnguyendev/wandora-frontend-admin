import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { addProfit } from "@/actions";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

const formSchema = z.object({
  masterId: z.coerce.number().min(1, "MasterId phải lớn hơn 0"),
  profit: z.coerce.number().min(3, {
    message: "Lợi nhuận không hợp lệ.",
  }),
});

const AddProfit = () => {
  const isMobile = useIsMobile();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      masterId: 0,
      profit: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const ID = Math.floor(1000 + Math.random() * 9000);

    try {
      setLoading(true);
      const data = {
        id: ID,
        masterId: values.masterId,
        profit: values.profit,
      };

      const res = await addProfit(data);

      if (res.status !== 201) return;

      form.reset();

      toast.success("Thêm lợi nhuận thành công!");

      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra khi thêm lợi nhuận");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="default" size="sm">
          <PlusCircle />
          <span>Thêm lợi nhuận</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
            <DrawerHeader className="gap-1">
              <DrawerTitle>Thêm mới lợi nhuận </DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="masterId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="Master">Master ID</FormLabel>
                      <FormControl>
                        <Input {...field} id="Master" placeholder="600xx" type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="profit">Lợi nhuận</FormLabel>
                      <FormControl>
                        <Input {...field} id="profit" placeholder="12788" type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button disabled={loading} type="submit">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Xác nhận"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Thoát</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default AddProfit;
