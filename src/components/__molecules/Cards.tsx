import { useEffect, useState } from "react";
import Card from "../__atoms/Card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const Cards = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [total, setTotal] = useState(0);

  const getInventories = async () => {
    const resp = await fetch(
      `http://localhost:3001/api/inventories?page=${page}&limit=${limit}`
    );
    const data = await resp.json();

    setPosts(data.inventories);
    setTotal(data.total);
  };

  useEffect(() => {
    getInventories();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-full h-fit mt-8 flex mb-5 flex-col">
      <div className="w-full p-5 pt-4 font-extrabold text-xl flex flex-row justify-evenly">
        <h1 className="-ml-3">სახელი</h1>
        <h1 className="ml-10">ადგილმდებარეობა</h1>
        <h1 className="ml-5">ფასი</h1>
        <h1 className="-mr-8">ოპერაციები</h1>
      </div>

      <Card posts={posts} />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => page > 1 && setPage(page - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => page < totalPages && setPage(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Cards;
