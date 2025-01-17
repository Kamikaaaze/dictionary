import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [keyword, setKeyword] = useState("Dictionary");
  const [phonetics, setPhonetics] = useState("/ˈdɪkʃəˌnɛɹi/");
  const [meaning, setMeaning] = useState(
    ['A reference work with a list of words from one or …onunciation, usage, translations, and other data.',
' A synchronic dictionary of a sta…ain words that are properly part of the language.'

  ])

  //phonetics fetching//
  const search = async () => {
    setPhonetics("not available...");
    //setMeaning("not available");
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`
      );
      console.log(response.data);
      if (response.data[0]?.phonetics[1]?.text) {
        setPhonetics(response.data[0].phonetics[1].text);
      } else if (response.data[0]?.phonetics[0]?.text) {
        setPhonetics(response.data[0].phonetics[0].text);
      }
    } catch (error) {
      console.log(error);
      setPhonetics("not available...");
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
        <div className="nounDiv">
          <p>noun</p>
          <p>Meaning</p>
          <div className="bullets">
            {
              meaning.slice(0,3).map((item,index)=>{
               return  <p key={index}>{item}</p>;
              })
            }
           
          </div>
          <div className="synonymDiv">
            <p>Synonym</p>
            <p>Classic keyboard</p>
          </div>
          <div className="nounDiv">
            <p>verb</p>
            <p>Meaning</p>
            <div className="bullets">
              <p>this meaning is called the meaning of life behind it</p>
              <p className="example">this p tag should not be bulleted</p>
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
