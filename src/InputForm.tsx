import React, { useState, useEffect } from "react";

import { getWordData } from "./logic";
import { languageTypes } from "./languages";

import Detail from "./Detail";
import { Container, Title } from "./Styled";

import {IAPIData, IWordDetail} from "./interfaces/APIData";

const InputForm = () => {
  const [data, setData] = useState([]);
  const [word, setWord] = useState<string>("");
  const [searchedWord, setSearchedWord] = useState("");
  const [mappedLanguages, setMappedLanguages] = useState<JSX.Element[]>([]);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [detailWord, setDetailWord] = useState<IWordDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const types = Object.entries(languageTypes);
    const mappedTypes = types.map(typePair => (
      <option key={typePair[0]} value={typePair[0]}>
        {typePair[1]}
      </option>
    ));
    setMappedLanguages(mappedTypes);
  }, []);

  const doShowDetail = (showDetailWordDetail: IWordDetail) => {
    setDetailWord(showDetailWordDetail);
  };

  const wordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setError("");
    setWord(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (word === "") {
      return;};
    setError("");
    setData([]);
    setLoading(true);
    setSearchedWord("");
    setDetailWord(null);
    try {
      const results = await getWordData(word, language);
      setLoading(false);
      setData(results);
      setSearchedWord(word);
    } catch (error) {
      setLoading(false);
      setError(error.toString());
    }
  };

  return (
    <div className="container section is-fluid">
      <Container color="rgba(10,40,200,0.5)">
        <h1>
          <Title color="white">Search for semantically similar words</Title>
        </h1>
      </Container>
      <Container color="rgba(100,10,200,0.5)">
        <div className="columns ">
          <div className="section is-fluid column">
            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="label">
                  <Title color="darkblue">Word to search for:</Title>
                </label>
                <div className="control">
                  <input
                    className="input"
                    value={word}
                    onChange={wordChange}
                    type="text"
                    placeholder="Word to search for..."
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">
                  <Title color="darkblue">Language:</Title>
                </label>
                <div className="select">
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  >
                    {mappedLanguages}
                  </select>
                </div>
              </div>
              {word && (
                <div className="field">
                  <div className="control">
                    <br />
                    <button className="button is-link">Submit</button>
                  </div>
                </div>
              )}
            </form>
            <div className="container">
              {loading && "Loading results..."}
              {error && (
                <Title color="yellow" >
                  {error}
                </Title>
              )}
              {!loading && data && data.length !== 0 && (
                <div>
                  <br />

                  <h2>
                    <Title color="darkblue">
                      Semantically similar words for &quot;{searchedWord}&quot;
                      (click for detail)
                    </Title>
                  </h2>
                  <br />
                  <div className="list is-hoverable">
                    {data.length !== 0 &&
                      data.map((mapWord:IWordDetail, index) => (
                        <a
                          onClick={() => doShowDetail(mapWord)}
                          className="list-item"
                          key={index}
                        >
                          {mapWord.word }
                        </a>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="section is-fluid column">
            {detailWord !== null && <Detail word={detailWord} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InputForm;
