import { useState } from "react";

import { toast } from "sonner";

import { DeleteTour } from "@/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function TourConfirm({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    try {
      setOpen(false);
      DeleteTour(id);
      toast.success("Delete data successful");
    } catch (err) {
      toast.error("Delete failed");
    }
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
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
