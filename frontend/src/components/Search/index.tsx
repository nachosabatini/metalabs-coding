import { FC } from "react";
import { MdSearch } from "react-icons/md";

type SearchProps = {
  handleSearch: (event: string) => void;
};

const Search: FC<SearchProps> = ({ handleSearch }) => {
  return (
    <div className="flex items-center bg-gray-200 border rounded-xl drop-shadow p-1 w-full">
      <MdSearch size="1.5rem" />
      <input
        type="text"
        placeholder="Type to search..."
        className="bg-transparent border-none w-full p-2 focus:outline-none"
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
};

export default Search;
