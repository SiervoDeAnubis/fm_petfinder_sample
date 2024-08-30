const fetchSearch = async ({ queryKey }) => {
  const { animal, breed, location } = queryKey[1];
  const response = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );

  if (!response.ok) {
    throw new Error(`pet search not okay: ${animal}, ${location} and ${breed}`);
  }

  return response.json();
};

export default fetchSearch;
