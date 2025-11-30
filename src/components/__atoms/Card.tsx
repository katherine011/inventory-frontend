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
import { toast } from "sonner";

interface Props {
  posts: {
    id: number;
    name: string;
    price: number;
    location: { name: string };
  }[];
}

const Card = ({ posts }: Props) => {
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

          <div className="w-[19%] ">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
