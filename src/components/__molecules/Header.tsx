import { Link } from "react-router-dom";
import Add from "../../assets/icons/add (1).png";
import Statistic from "../../assets/icons/statistics.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

type Stat = {
  location: string;
  count: number;
  totalPrice: number;
};

const Header = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const loadStats = async () => {
    const res = await fetch("http://localhost:3001/api/statistics");
    const data = await res.json();
    setStats(data.stats);
    setTotalProducts(data.totalProducts);
    setTotalValue(data.totalValue);
  };

  return (
    <div className=" w-full h-20 border border-gray-200 pl-4 pr-4 flex items-center justify-between rounded-[10px] bg-blue-950 ">
      <Link to={"/addItems"}>
        <div className="h-[50px] hover:bg-blue-100 cursor-pointer font-medium rounded-lg flex flex-row gap-2 items-center p-2 bg-white  ">
          <img
            src={Add}
            alt="add"
            width={40}
            height={40}
            className="w-[22px] h-[22px]"
          />

          <p>დამატება</p>
        </div>
      </Link>
      <h1 className="text-4xl text-white font-extrabold ">ინვენტარის მართვა</h1>
      <Dialog>
        <form>
          <DialogTrigger asChild onClick={loadStats}>
            <div className="h-[50px] hover:bg-blue-100 cursor-pointer font-medium rounded-lg flex flex-row gap-2 items-center p-2 bg-white  ">
              <img
                src={Statistic}
                alt="Statistic"
                width={40}
                height={40}
                className="w-[22px] h-[22px]"
              />
              <DialogTitle>სტატისტიკა</DialogTitle>{" "}
              <DialogDescription></DialogDescription>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] h-[470px] p-0 ">
            <div className="w-full h-[70px] bg-blue-950 rounded-t-lg flex items-center justify-center  ">
              <h1 className="font-extrabold text-3xl text-white ">
                სტატისტიკა
              </h1>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-start -mt-5 p-7 ">
              <div className="w-full h-10 flex flex-row justify-between font-semibold items-center bg-gray-100 p-4 ">
                <p>კინოთეატრი</p>
                <p>რაოდენობა</p>
                <p>ჯამური ფასი</p>
              </div>
              {stats.map((el) => (
                <div className="w-full p-3 h-[50px] flex flex-row justify-between items-center border-t-2 border-t-gray-300 ">
                  <div className="flex flex-start w-[30%] ">
                    <p>{el.location}</p>
                  </div>
                  <div className="flex flex-start w-[20%] ">
                    <p>{el.count.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-start w-[20%] ">
                    <p>{el.totalPrice.toLocaleString()}GEL</p>
                  </div>
                </div>
              ))}
              <div className="w-full h-10 mt-4 flex flex-row font-semibold justify-between rounded-lg items-center bg-blue-100 p-5 ">
                <h1 className="text-2xl ">სულ:</h1>
                <p className="ml-10">{totalProducts.toLocaleString()}</p>
                <p>{totalValue.toLocaleString()}GEL</p>
              </div>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default Header;
