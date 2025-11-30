import Cards from "../__molecules/Cards";
import Header from "../__molecules/Header";

const MainPage = () => {
  return (
    <div className="w-full h-auto flex items-start  shadow-2xs  m-[190px] mb-10 mt-7 flex-col rounded-t-[15px]  ">
      <Header />
      <Cards />
    </div>
  );
};

export default MainPage;
