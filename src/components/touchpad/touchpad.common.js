// Function to return an ID for our input
// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
export const getInputId = () => {
  const idGenerator = () => {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(2, 10);
  };

  const stringId = `${idGenerator()}${idGenerator()}`;
  return stringId.slice();
};
