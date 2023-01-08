import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { InputContext } from "../App";
import Antonym from "./Antonym";
import Example from "./Example";
import MeanigList from "./MeaningList";
import Synonym from "./Synonym";

axios.defaults.baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const ResultList = () => {
  const { inputValue } = useContext(InputContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [audio, setAudio] = useState("");

  const fetchData = async (param) => {
    try {
      setLoading(true);
      const res = await axios(`/${param}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData(inputValue);
    }
  }, [inputValue]);

  function filterAudio() {
    let audio = [];
    if (response) {
      if (response.length === 1) {
        response.forEach((element) => {
          element.phonetics.forEach((item) => {
            audio.push(item.audio);
          });
        });
      } else {
        response.forEach((element) => {
          element.phonetics.forEach((item, i) => {
            if (item.audio) {
              audio.push(item.audio);
            }
          });
        });
      }
    }
    return audio;
  }

  const audio = filterAudio();
  if (loading) {
    return (
      <div className="flex flex-col space-y-3 animate-pulse p-4 container mx-auto max-w-2xl">
        <div className="h-6 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-8 bg-gray-300 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-300 mt-5 rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <h3 className="text-center mt-10 font-semibold text-gray-500">
        No Definitions Found 😥
      </h3>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {response && (
        <div>
          <h3 className="text-2xl font-bold mt-4">Произношения:</h3>

          <div className="flex flex-wrap justify-between">
            {audio.length > 0 ? (
              audio.map((item) => (
                <audio controls>
                  <source src={item} type="audio/mpeg" />
                </audio>
              ))
            ) : (
              <h5>Аудио не найдено 😥</h5>
            )}
          </div>
          <h3 className="text-2xl font-bold mt-4">Значение и определения:</h3>
          <MeanigList mean={response} />
          <h3 className="text-2xl font-bold mt-4">Пример:</h3>
          <Example mean={response} />
          <h3 className="text-2xl font-bold mt-4">Синоним:</h3>
          <Synonym mean={response} />
          <h3 className="text-2xl font-bold mt-4">Антоним:</h3>
          <Antonym mean={response} />
        </div>
      )}
    </div>
  );
};

export default ResultList;
