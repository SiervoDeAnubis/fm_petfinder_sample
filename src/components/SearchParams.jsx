import { useState } from "react";
import useBreedList from "../hooks/useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../request/fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  //const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  //const [breed, setBreed] = useState("");
  //const [pets, setPets] = useState([]);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const results = useQuery({
    queryKey: ["search", requestParams],
    queryFn: fetchSearch,
  });
  const [, breedList] = useBreedList(animal);

  const pets = results?.data?.pets ?? [];

  /*useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const requestPets = async () => {
    const result = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
    );
    const response = await result.json();
    setPets(response.pets);
  };*/

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //requestPets();
          const formData = new FormData(e.target);
          setRequestParams({
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          });
        }}
      >
        <label htmlFor="location">
          Location
          <input name="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select name="breed" disabled={!breedList.length}>
            <option />
            {breedList.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
