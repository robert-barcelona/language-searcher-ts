import axios from "axios";

export const getWordData = async (word:string, language = "en") => {
  const queryURL = `https://api.gavagai.se/v3/lexicon/${language}/${word}?apiKey=3acdef1f01cbceb88b132158abd466da&additionalFields=SEMANTICALLY_SIMILAR_WORDS`;
  try {
    const results = await axios.get(queryURL);
    return results.data.semanticallySimilarWords;
  } catch (error) {
    throw new Error(`Unable to connect to service: ${error.message}`);
  }
};
