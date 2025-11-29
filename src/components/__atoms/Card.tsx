import { useEffect, useState } from "react";
import Trash from "../../assets/icons/bin.png";

interface Props {
  posts: {
    id: number;
    name: string;
    price: number;
    location: { name: string };
  }[];
}

const Card = ({ posts }: Props) => {
  return (
    <div>
      {posts?.map((el) => (
        <div
          key={el.id}
          className="w-full pl-34 h-18 mb-3 text-start rounded-lg font-semibold bg-white shadow-md  flex items-center justify-evenly border-white hover:border-blue-400 hover:bg-blue-100 "
        >
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
            <img
              src={Trash}
              alt="trash"
              width={70}
              height={70}
              className="w-[25px] h-[25px] cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
