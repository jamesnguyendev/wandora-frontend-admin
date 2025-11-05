import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { DeleteUser } from "@/actions/user/delete-user";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function DeleteConfirm({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await DeleteUser(id);

    if (res.code !== 200) return;

    toast.success(res.message ?? "Delete data successful");

    router.refresh();
    setOpen(false);
  };

  return (
    <>
      <DropdownMenuItem
        variant="destructive"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Delete
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to delete?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
