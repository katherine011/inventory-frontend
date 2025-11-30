import { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/icons/arrow.png";
import { toast } from "sonner";

const AddItems = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [locationId, setLocationId] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    price: false,
    locationId: false,
  });

  const validate = () => {
    const newErrors = {
      name: name.trim() === "",
      price: price.trim() === "",
      locationId: locationId.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const resp = await fetch("http://localhost:3001/api/inventories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          locationId,
        }),
      });

      if (!resp.ok) {
        const error = await resp.json();
        toast(error.error || "დამატება ვერ მოხერხდა");
        return;
      }

      toast.success("თქვენი პროდუქტი წარმატებით დაემატა!");
      navigate("/");
    } catch (err) {
      toast.error("სერვერის შეცდომა");
    }
  };

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

      <div className="w-[29%] h-[53%] bg-white rounded-[10px] shadow-lg ">
        <div className="w-full h-[70px] bg-blue-950 rounded-t-[10px] text-white font-semibold text-4xl flex items-center justify-center ">
          <h1>ნივთის დამატება</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-7 items-center p-10 "
        >
          <div className="flex flex-col relative gap-2">
            <Select onValueChange={(val) => setLocationId(val)}>
              <SelectTrigger
                className={`w-[290px] h-[43px]  ${
                  errors.locationId ? "border-red-500" : ""
                }`}
              >
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
            {errors.locationId && (
              <p className="text-red-500 text-sm font-semibold absolute top-9 ml-12">
                ველის შევსება სავალდებულოა
              </p>
            )}{" "}
          </div>
          <div className="flex flex-col relative gap-2">
            <Input
              className={`w-[290px]  ${errors.name ? "border-red-500" : ""}`}
              placeholder="სახელწოდება"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-semibold absolute top-9 ml-12">
                ველის შევსება სავალდებულოა!
              </p>
            )}
          </div>
          <div className="flex flex-col relative gap-2">
            <Input
              className={`w-[290px]  ${errors.price ? "border-red-500" : ""}`}
              type="number"
              placeholder="ფასი"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && (
              <p className="text-red-500 text-sm font-semibold absolute top-9  ml-12">
                ველის შევსება სავალდებულოა
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-white hover:bg-gray-200 text-black w-[100px] border cursor-pointer outline outline-gray-200 "
          >
            დამატება
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
