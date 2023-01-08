const MeanigList = ({ mean }) => {
  console.log(mean);
  return (
    <div>
      {mean.map((val) =>
        val.meanings.map((means) =>
          means.partOfSpeech === "noun" ? (
            <div>
              <h5 className="text-2xl font-bold mt-4">{means.partOfSpeech}:</h5>
              {means.definitions.map((def) => (
                <div key={def.definition}>
                  <li>{def.definition}</li>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h5 className="text-2xl font-bold mt-4">{means.partOfSpeech}:</h5>
              {means.definitions.map((def) => (
                <div key={def.definition}>
                  <li>{def.definition}</li>
                  <hr />
                </div>
              ))}
            </div>
          )
        )
      )}
    </div>
  );
};

export default MeanigList;
