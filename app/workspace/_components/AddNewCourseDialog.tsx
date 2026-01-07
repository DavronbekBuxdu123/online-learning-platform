"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2Icon, SparkleIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function AddNewCourseDialog({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [chapters, setChapters] = useState<string>("");
  const [video, setVideo] = useState<boolean>();
  const [level, setLevel] = useState<string>();
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    if (!name || !description || !chapters || !level || !category) {
      toast.warning("Iltimos, kurs yaratish uchun formani to'liq to'ldiring!");
      return;
    }
    const formData = {
      name,
      description,
      chapters: Number(chapters),
      video,
      level,
      category,
    };

    try {
      setLoading(true);
      const courseId = uuidv4();
      const res = await axios.post("/api/generate-course", {
        formData,
        courseId,
      });
      setLoading(false);
      router.push("/workspace/edit-course/" + res.data?.courseId);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yangi kurs yarating </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4 mt03">
              <div>
                <label>Kurs nomi</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                  placeholder="JavaScript..."
                />
              </div>
              <div>
                <label>Kurs tavsifi (Ixtiyoriy)</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                  placeholder="JavaScript basic..."
                />
              </div>
              <div>
                <label>Bo'limlar soni</label>
                <Input
                  value={chapters}
                  onChange={(e) => setChapters(e.target.value)}
                  className="mt-1"
                  placeholder="Bo'limlar..."
                  type="number"
                />
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Label htmlFor="airplane-mode">Video dars</Label>
                <Switch
                  checked={video}
                  onCheckedChange={setVideo}
                  id="airplane-mode"
                />
              </div>
              <div>
                <label>Qiyinlik darajasi</label>
                <div className="mt-1">
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Qiyinlik darajasi..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="beginner">Boshlang'ich</SelectItem>
                        <SelectItem value="moderate">O'rtacha</SelectItem>
                        <SelectItem value="advanced">Yuqori</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label>Kategoriya</label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1"
                  placeholder="Dasturlash..."
                />
              </div>
              <Button
                disabled={loading}
                onClick={handleSubmit}
                className="bg-[#992edb] w-full mt-5 text-white hover:bg-[#992edb] cursor-pointer"
              >
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <SparkleIcon />
                )}
                Kurs yaratish
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewCourseDialog;
