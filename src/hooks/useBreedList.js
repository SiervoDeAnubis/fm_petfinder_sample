import { useEffect, useState } from "react";

const localCache = {};

const useBreedList = (animal) => {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const result = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
      );
      const response = await result.json();

      localCache[animal] = response.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [status, breedList];
};

export default useBreedList;
