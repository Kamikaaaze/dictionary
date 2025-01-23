import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";



function App() {
  const [userInput, setUserInput] = useState("Dictionary");
  const [keyword, setKeyword] = useState("Dictionary");
  const [phonetics, setPhonetics] = useState("/ˈdɪkʃəˌnɛɹi/");
  const [meaning, setMeaning] = useState([
    "A reference work with a list of words from one or …onunciation, usage, translations, and other data.",
    " A synchronic dictionary of a sta…ain words that are properly part of the language.",
  ]);
  const [synonymn, setSynonymn] = useState(["wordbook"]);
  const [verb, setVerb] = useState("To look up in a dictionary.");
  const [nounEg, setNounEg] = useState("");
  const [link, setLink] = useState("https://en.wiktionary.org/wiki/dictionary");

  //API FETCHING //
  const search = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`
      );
      console.log(response.data);
      setPhonetics(response.data[0].phonetic);

      if (response.data[0]?.meanings[0]?.definitions.length > 0) {
        setMeaning(
          response.data[0]?.meanings[0]?.definitions.map(
            (data) => data.definition
          )
        );
      } else setMeaning("not available");

      if (response.data[0]?.meanings[0]?.synonyms.length > 0) {
        setSynonymn(response.data[0].meanings[0].synonyms);
      } else setSynonymn(["not available"]);

      if (response.data[2]?.meanings[0]?.definitions.length > 0) {
        setVerb(response.data[2]?.meanings[0]?.definitions[0].definition);
      } else if (response.data[0]?.meanings[1]?.definitions.length > 0) {
        setVerb(response.data[0]?.meanings[1]?.definitions[0].definition);
      } else setVerb("'not available' ");

      if (response.data[2]?.meanings[0]?.definitions.length > 0) {
        setNounEg(response.data[2]?.meanings[0]?.definitions[0].example);
      } else setNounEg("");

      if (response.data[0]?.sourceUrls) {
        setLink(response.data[0]?.sourceUrls);
      } else setLink("...");
    } catch (error) {
      console.log(error);
      setPhonetics("not available...");
      setMeaning(["not available"]);
      setSynonymn(["not available"]);
      setVerb("not available");
      setNounEg("error");
    }
  };
  const keyWord = () => {
    setKeyword(userInput);
  };

  useEffect(() => {
    const initialResponse = async () => {
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/dictionary`
        );
        console.log(response.data);
        setPhonetics(response.data[0].phonetic);

        if (response.data[0]?.meanings[0]?.definitions.length > 0) {
          setMeaning(
            response.data[0]?.meanings[0]?.definitions.map(
              (data) => data.definition
            )
          );
        } else setMeaning("not available");

        if (response.data[0]?.meanings[0]?.synonyms.length > 0) {
          setSynonymn(response.data[0].meanings[0].synonyms);
        } else setSynonymn(["not available"]);

        if (response.data[2]?.meanings[0]?.definitions.length > 0) {
          setVerb(response.data[2]?.meanings[0]?.definitions[0].definition);
        } else if (response.data[0]?.meanings[1]?.definitions.length > 0) {
          setVerb(response.data[0]?.meanings[1]?.definitions[0].definition);
        } else setVerb("'not available' ");

        if (response.data[2]?.meanings[0]?.definitions.length > 0) {
          setNounEg(response.data[2]?.meanings[0]?.definitions[0].example);
        } else setNounEg("");

        if (response.data[0]?.sourceUrls) {
          setLink(response.data[0]?.sourceUrls);
        } else setLink("...");
      } catch (error) {
        console.log(error);
        setPhonetics("not available...");
        setMeaning(["not available"]);
        setSynonymn(["not available"]);
        setVerb("not available");
        setNounEg("error");
      }
    };
    initialResponse();
  }, []);
  return (
    <div className="mainDiv">
      
      <div className="card">
        <div className="iconsDiv">
        
        <i class="fa-solid fa-book fa-xl"></i>
          <div className="rightIcons">
            <div className="vertical-line"></div>
          <i class="fa-solid fa-toggle-on fa-xl"></i>
          <i class="fa-regular fa-moon fa-xl"></i>
          </div>
        </div>
        <div className="inputDiv">
          <input
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
           
            className="search-box"
            type="text"
            value={userInput}
          />
          
          <i class="fa-solid fa-magnifying-glass"
         
           onClick={() => {
            search();
            keyWord();
          }}
          ></i>

        </div>
        <div className="wordDiv">
          <div className="wordDivLeft">
            <p className="keyWord">{keyword}</p>
            <p className="phonetic">{phonetics}</p>
          </div>

          <p>Icons</p>
        </div>
        <div className="meaningDiv">
          <p className="heading">noun</p>
          <p className="subHeading">Meaning</p>
          <div className="bullets">
            {meaning.slice(0, 3).map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
          <div className="synonymDiv">
            <p className="subHeading">Synonym</p>
            {synonymn.slice(0, 2).map((synonym, index) => (
              <p className="synonymn" key={index}>{synonym}</p>
            ))}
          </div>
          <div className="nounDiv">
            <p className="heading">verb</p>
            <p className="subHeading">Meaning</p>
            <div className="bullets">
              <p>{verb}</p>
              <p className="example">{nounEg}</p>
            </div>
          </div>
        </div>

        <div className="source">
          <p className="subHeading">Source</p>
          <a href={link} target="_blank" rel="no opener no referrer">
            {link}
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
