import { useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Product Image" }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Convert file to base64 URL for preview and storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onChange(result);
        toast({
          title: "Image uploaded",
          description: "Image has been selected successfully",
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    toast({
      title: "Image removed",
      description: "Image has been cleared",
    });
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>
      
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg border-2 border-primary/20"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-center justify-center gap-2">
            <label htmlFor="image-input" className="cursor-pointer">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                asChild
              >
                <span className="gap-2">
                  <Upload className="h-4 w-4" />
                  Change
                </span>
              </Button>
            </label>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <label htmlFor="image-input" className="cursor-pointer">
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 hover:border-primary/50 hover:bg-primary/5 transition-colors">
            <div className="flex flex-col items-center justify-center gap-2">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        </label>
      )}

      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isLoading}
        className="hidden"
      />

      {isLoading && (
        <p className="text-xs text-muted-foreground text-center">Processing image...</p>
      )}
    </div>
  );
}
