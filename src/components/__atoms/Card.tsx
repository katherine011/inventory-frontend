import Trash from "../../assets/icons/bin.png";
import Circle from "../../assets/icons/circle.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Edit from "../../assets/icons/edit-text.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";

interface Props {
  posts: {
    id: number;
    name: string;
    price: number;
    location: { name: string };
  }[];
}

const Card = ({ posts }: Props) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number | string>("");
  const [editLocationId, setEditLocationId] = useState<number | string>("");

  const deleteInventory = async (id: number) => {
    try {
      const resp = await fetch(`http://localhost:3001/api/inventories/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) {
        const err = await resp.json();
        toast.error(err.error || "წაშლა ვერ მოხერხდა");
        return;
      }

      window.location.reload();
    } catch (error) {
      toast.error("სერვერის შეცდომა");
    }
  };

  const updateInventory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editId) return;

    const resp = await fetch(
      `http://localhost:3001/api/inventories/${editId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          price: Number(editPrice),
          locationId: Number(editLocationId),
        }),
      }
    );

    if (!resp.ok) {
      const err = await resp.json();
      toast.error(err.error || "რედაქტირება ვერ მოხერხდა");
      return;
    }

    toast.success("წარმატებით განახლდა!");
    window.location.reload();
  };

  return (
    <div>
      {posts?.map((el) => (
        <div
          key={el.id}
          className="w-full pl-34 relative h-18 mb-3 text-start rounded-lg font-semibold bg-white shadow-md  flex items-center justify-evenly border-white hover:border-blue-400 hover:bg-blue-100 "
        >
          <img
            src={Circle}
            alt="Circle"
            className="absolute w-3 h-3 left-16  "
          />
          <div className="w-[25%] ">
            <p>{el.name}</p>
          </div>

          <div className="w-[30%] ">
            <p>{el.location?.name}</p>
          </div>

          <div className="w-[20%] ">
            <p>{el.price} GEL</p>
          </div>

          <div className="w-[19%] flex flex-row items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <img
                  src={Trash}
                  alt="trash"
                  width={70}
                  height={70}
                  className="w-[25px] h-[25px] cursor-pointer"
                />
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>ნამდვილად გსურთ წაშლა?</AlertDialogTitle>
                  <AlertDialogDescription>
                    წაშლისშემდეგ თქვენ ვერ დააბრუნებთ პროდუქტის მონაცემებს. ის
                    სამუდამოდ წაიშლება ბაზიდან.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>გამოსვლა</AlertDialogCancel>

                  <AlertDialogAction onClick={() => deleteInventory(el.id)}>
                    დიახ
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Dialog>
              <DialogTrigger
                onClick={() => {
                  setEditId(el.id);
                  setEditName(el.name);
                  setEditPrice(el.price);
                  setEditLocationId(
                    String(
                      {
                        "მთავარი ოფისი": 1,
                        "კავეა გალერია": 2,
                        "კავეა თბილისი მოლი": 3,
                        "კავეა ისთ ფოინთი": 4,
                        "კავეა სითი მოლი": 5,
                      }[el.location.name]
                    )
                  );
                }}
              >
                <img src={Edit} className="w-[25px] h-[25px] cursor-pointer" />
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] h-[470px] p-0">
                <div className="w-full h-[70px] bg-blue-950 rounded-t-lg flex items-center justify-center">
                  <h1 className="font-extrabold text-3xl text-white">
                    რედაქტირება
                  </h1>
                </div>

                <form
                  className="w-full h-full flex flex-col gap-7 items-center p-10"
                  onSubmit={updateInventory}
                >
                  <Select
                    value={String(editLocationId)}
                    onValueChange={(el) => setEditLocationId(el)}
                  >
                    <SelectTrigger className="w-[290px] h-[43px] bg-white">
                      <SelectValue placeholder="ადგილმდებარეობა" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>ადგილმდებარეობა</SelectLabel>
                        <SelectItem value="1">მთავარი ოფისი</SelectItem>
                        <SelectItem value="2">კავეა გალერია</SelectItem>
                        <SelectItem value="3">კავეა თბილისი მოლი</SelectItem>
                        <SelectItem value="4">კავეა ისთ ფოინთი</SelectItem>
                        <SelectItem value="5">კავეა სითი მოლი</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Input
                    className="w-[290px]"
                    placeholder="სახელწოდება"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />

                  <Input
                    className="w-[290px]"
                    type="number"
                    placeholder="ფასი"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />

                  <Button
                    type="submit"
                    className="bg-white hover:bg-gray-200 text-black w-[120px] border"
                  >
                    რედაქტირება
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
