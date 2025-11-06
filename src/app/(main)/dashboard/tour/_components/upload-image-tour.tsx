import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { updateImg } from "@/actions/tour/upload-img";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/shadcn-io/dropzone";
import { uploadFileToS3 } from "@/lib/upload-file-to-s3";

type FormValues = {
  imageFile: File | null;
};

const MIN_SIZE = 1024;
const MAX_SIZE = 10 * 1024 * 1024;

const formSchema = z.object({
  imageFile: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size >= MIN_SIZE, { message: "File is too small (min 1KB)" })
    .refine((file) => file.size <= MAX_SIZE, { message: "File is too large (max 10MB)" }),
});

const UploadImageTour = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { imageFile: null },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (!values.imageFile) throw new Error("No file selected");

      const s3_url_image = await uploadFileToS3(values.imageFile, id);

      const res = await updateImg(id, s3_url_image);
      setOpen(false);
      toast.success(res.message ?? "Upload image data successful");
    } catch (err) {
      toast.error("Upload image failed");
    }
  };

  return (
    <>
      <DropdownMenuItem
        variant="default"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Upload image
      </DropdownMenuItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Let&apos;s upload your image!</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="imageFile"
              control={control}
              render={({ field }) => (
                <Dropzone
                  accept={{ "image/*": [] }}
                  maxFiles={1}
                  maxSize={MAX_SIZE}
                  minSize={MIN_SIZE}
                  onDrop={(acceptedFiles) => {
                    const image = acceptedFiles.find((file) => file.type.startsWith("image/"));
                    if (image) field.onChange(image);
                  }}
                  onError={console.error}
                  src={field.value ? [field.value] : []}
                >
                  <DropzoneEmptyState />
                  <DropzoneContent />
                </Dropzone>
              )}
            />
            {errors.imageFile && <p className="mt-1 text-sm text-red-500">{errors.imageFile.message}</p>}
            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button className="cursor-pointer" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="default" type="submit" className="cursor-pointer">
                Confirm
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadImageTour;
