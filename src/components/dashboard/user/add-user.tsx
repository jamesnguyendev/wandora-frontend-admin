import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { addUser } from "@/actions";
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
  name: z.string().min(1, {
    message: "Tên không được bỏ trống.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email không hợp lệ.",
    })
    .email({
      message: "Email không đúng định dạng",
    }),
  phone: z
    .string()
    .min(1, {
      message: "Số điện thoại không hợp lệ.",
    })
    .max(10, {
      message: "Số điện thoại không hợp lệ.",
    })
    .length(10, {
      message: "Số điện thoại không hợp lệ",
    }),
});

const AddUser = () => {
  const isMobile = useIsMobile();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const res = await addUser(data);

      if (res.status !== 201) return;

      form.reset();

      toast.success("Thêm người dùng thành công!");

      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra khi thêm người dùng");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="default" size="sm">
          <PlusCircle />
          <span>Thêm người dùng</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
            <DrawerHeader className="gap-1">
              <DrawerTitle>Thêm mới người dùng </DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="name">Tên người dùng</FormLabel>
                      <FormControl>
                        <Input {...field} id="name" placeholder="John height" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input {...field} id="email" placeholder="example@gmail" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                      <FormControl>
                        <Input {...field} id="phone" placeholder="098873845" type="number" />
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

export default AddUser;
