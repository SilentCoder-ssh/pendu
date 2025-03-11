export const getWord = async () => {
  try {
    const response = await fetch("http://localhost:3000/word");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    throw e;
  }
};
