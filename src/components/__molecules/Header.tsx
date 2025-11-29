import { Link, Route, Routes } from "react-router-dom";
import Add from "../../assets/icons/add (1).png";
import Statistic from "../../assets/icons/statistics.png";

const Header = () => {
  return (
    <div className=" w-full h-20 border border-gray-200 pl-4 pr-4 flex items-center justify-between rounded-[10px] bg-blue-950 ">
      <Link to={"/addItems"}>
        {" "}
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
      <h1 className="text-4xl text-white font-extrabold "> Cavea Plus </h1>
      <div className="h-[50px] hover:bg-blue-100 cursor-pointer font-medium rounded-lg flex flex-row gap-2 items-center p-2 bg-white  ">
        <img
          src={Statistic}
          alt="Statistic"
          width={40}
          height={40}
          className="w-[22px] h-[22px]"
        />
        <p>სტატისტიკა</p>
      </div>
    </div>
  );
};

export default Header;
