import { useEffect, useState } from "react";
import Card from "../__atoms/Card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { Loader } from "lucide-react";

const Cards = () => {
  const [posts, setPosts] = useState([]);
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page")) || 1;
  const limit = 20;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingStat, setLoadingStat] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("ყველა");
  const [totalProducts, setTotalProducts] = useState(0);

  const getInventories = async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        `http://localhost:3001/api/inventories?page=${page}&limit=${limit}&location=${selectedLocation}`
      );

      const data = await resp.json();

      setPosts(data.inventories);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async (location: string) => {
    setLoadingStat(true);
    try {
      const res = await fetch(
        `http://localhost:3001/api/statistics?location=${location}`
      );
      const data = await res.json();
      setTotalProducts(data.totalProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStat(false);
    }
  };

  useEffect(() => {
    getInventories();
    loadStats(selectedLocation);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, selectedLocation]);

  const totalPages = Math.ceil(total / limit);

  const windowSize = 3;
  let start = Math.max(1, page - 1);
  let end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen bg-white flex items-center justify-center ">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-fit mt-5 flex mb-5 flex-col">
          <Select
            onValueChange={(value) => {
              setSelectedLocation(value);
              setParams({ page: "1", location: value });
            }}
          >
            <SelectTrigger
              className={`w-[260px] h-[43px] bg-white placeholder:black `}
            >
              <SelectValue placeholder="აირჩიეთ ადგილმდებარეობა" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>ადგილმდებარეობა</SelectLabel>
                <SelectItem value="მთავარი ოფისი">მთავარი ოფისი</SelectItem>
                <SelectItem value="კავეა გალერია">კავეა გალერია</SelectItem>
                <SelectItem value="კავეა თბილისი მოლი">
                  კავეა თბილისი მოლი
                </SelectItem>
                <SelectItem value="კავეა ისთ ფოინთი">
                  კავეა ისთ ფოინთი
                </SelectItem>
                <SelectItem value="კავეა სითი მოლი">კავეა სითი მოლი</SelectItem>
                <SelectItem value="ყველა">ყველა</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="w-full p-5 pt-4 font-extrabold text-xl flex flex-row justify-evenly">
            <h1 className="-ml-3">სახელი</h1>
            <h1 className="ml-10">ადგილმდებარეობა</h1>
            <h1 className="ml-5">ფასი</h1>
            <h1 className="-mr-8">ოპერაციები</h1>
          </div>
          <Card posts={posts} />
          <div className="w-full flex flex-row items-center justify-between ">
            <Pagination>
              <PaginationContent className="flex gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setParams({ page: String(page - 1) });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Prev
                  </PaginationPrevious>
                </PaginationItem>

                {pages.map((num) => (
                  <PaginationItem key={num}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setParams({ page: String(num) });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      isActive={num === page}
                      className={`px-3 py-1 rounded cursor-pointer ${
                        num === page
                          ? "bg-blue-500 text-white font-bold"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {totalPages > pages[pages.length - 1] && (
                  <PaginationItem>
                    <PaginationEllipsis className="px-2 text-gray-400" />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages)
                        setParams({ page: String(page + 1) });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Next
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="flex w-[120px] flex-row items-center font-medium gap-3">
              სულ: {loadingStat ? <Loader /> : totalProducts.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
