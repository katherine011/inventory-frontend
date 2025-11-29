import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import Arrow from "../../assets/icons/arrow.png";

const AddItems = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#FAFAFA] ">
      <Link to={"/"}>
        <div className="absolute top-4 left-4 text-black flex items-center font-medium flex-row gap-2 ">
          <img
            src={Arrow}
            alt="arrow"
            width={30}
            height={30}
            className="w-[15px] h-[15px] "
          />
          <p>უკან დაბრუნება</p>
        </div>
      </Link>
      <div className="w-[30%] h-[55%] bg-white rounded-[10px] shadow-lg ">
        <div className="w-full h-[70px] bg-blue-950 rounded-t-[10px] text-white font-semibold text-4xl flex items-center justify-center ">
          <h1>ნივთის დამატება</h1>
        </div>

        <form className="w-full h-full flex flex-col gap-5 items-center p-14 ">
          <Select>
            <SelectTrigger className="w-[290px]">
              <SelectValue placeholder="ადგილმდებარეობა" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ადგილმდებარეობა</SelectLabel>
                <SelectItem value="apple">მთავარი ოფისი</SelectItem>
                <SelectItem value="banana">კავეა გალერია</SelectItem>
                <SelectItem value="blueberry">კავეა თბილისი მოლი</SelectItem>
                <SelectItem value="grapes">კავეა ისთ ფოინთი</SelectItem>
                <SelectItem value="pineapple">კავეა სითი მოლი</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input className="w-[290px]" placeholder="სახელწოდება" />
          <Input className="w-[290px]" type="number" placeholder="ფასი" />
          <Button className="bg-white hover:bg-gray-200 text-black w-[100px] border cursor-pointer outline outline-gray-200 ">
            დამატება
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
