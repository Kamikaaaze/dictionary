import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [keyword, setKeyword] = useState("Dictionary");
  const [phonetics, setPhonetics] = useState("/ˈdɪkʃəˌnɛɹi/");
  const [meaning, setMeaning] = useState([
    "A reference work with a list of words from one or …onunciation, usage, translations, and other data.",
    " A synchronic dictionary of a sta…ain words that are properly part of the language.",
  ]);
  const [synonymn, setSynonymn] = useState(["wordbook"]);
  const [verb, setVerb] = useState("sample example for verb statement");
  const [nounEg,setNounEg] = useState("sample example here...")

  //phonetics fetching//
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

      if (response.data[0]?.meanings[1]?.definitions.length > 0) {
        setVerb(response.data[0]?.meanings[1]?.definitions[0].definition);
      }else setVerb("not available");

      // if(response.data[0]?.meanings[1]?.){

      // }else setNounEg("not available");
    } catch (error) {
      console.log(error);
      setPhonetics("not available...");
      setMeaning(["not available"]);
      setSynonymn(["not available"]);
      setVerb("not available");
    }
  };
  const keyWord = () => {
    setKeyword(userInput);
  };

  return (
    <div className="mainDiv">
      <div className="card">
        <div className="iconsDiv">icon</div>
        <div className="inputDiv">
          <input
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            placeholder="Type here.."
            className="search-box"
            type="text"
            defaultValue={"Dictionary"}
          />
          <button
            onClick={() => {
              search();
              keyWord();
            }}
          >
            GO
          </button>
        </div>
        <div className="wordDiv">
          <div className="wordDivLeft">
            <p className="keyWord">{keyword}</p>
            <p className="phonetic">{phonetics}</p>
          </div>

          <p>Icons</p>
        </div>
        <div className="meaningDiv">
          <p>noun</p>
          <p>Meaning</p>
          <div className="bullets">
            {meaning.slice(0, 3).map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
          <div className="synonymDiv">
            <p>Synonym</p>
            {synonymn.slice(0, 2).map((synonym, index) => (
              <p key={index}>{synonym}</p>
            ))}
          </div>
          <div className="nounDiv">
            <p>verb</p>
            <p>Meaning</p>
            <div className="bullets">
              <p>{verb}</p>
              <p className="example">{nounEg}</p>
            </div>
          </div>
        </div>

        <div className="source">
          <p>Source</p>
          <p>www.link.com</p>
        </div>
      </div>
    </div>
  );
}

export default App;
