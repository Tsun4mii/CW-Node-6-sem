import { useEffect, useState } from "react";
import SearchLayout from "../components/layouts/SearchLayout";
import Sidebar from "../components/Sidebar";
import { generateUrl } from "../lib/url_processing/processing-helpers";

export const getServerSideProps = async (context) => {
  const fetchUrl = generateUrl(context);
  const response = await fetch(`${fetchUrl}`, {
    method: "GET",
  });
  const content = await response.json();
  const rawMarks = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/search/allMarks`,
    {
      method: "GET",
    }
  );
  const marks = await rawMarks.json();
  const rawModels = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/search/allModels`,
    {
      method: "GET",
    }
  );
  const models = await rawModels.json();
  return {
    props: {
      data: content,
      marks: marks,
      models: models,
    },
  };
};

const Search = ({ data, marks, models }) => {
  const [refData, setRefData] = useState();
  const [refModels, setRefModels] = useState(models);
  const [refMarks, setRefMarks] = useState(marks);
  const [selectedMark, setSelectedMark] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setRefData(data);
    setRefModels(models);
    console.log(refModels);
  }, []);

  async function modelSelect(modelId) {
    setSelectedModel(modelId);
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/search/markByModels`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelId: modelId,
        }),
      }
    );
    const newMarks = await request.json();
    console.log(newMarks);
    //return setSelectedMark(newMarks[0]);
    return setRefMarks(newMarks);
  }
  async function markSelect(markId) {
    setSelectedMark(markId);
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/search/modelsByMark`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          markId: markId,
        }),
      }
    );
    const newModels = await request.json();
    console.log(newModels);
    return setRefModels(newModels);
  }

  async function test() {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/search/paramSearch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          markId: selectedMark,
          modelId: selectedModel,
        }),
      }
    );
    const result = await req.json();
    return setRefData(result);
  }

  return (
    <div className="row mh-100 mw-100" style={{ height: 100 + "vh" }}>
      <nav className="nav flex-column col-2 bg-dark ">
        <div>
          <ul>
            <li>
              <label htmlFor="mark-select" className="text-danger">
                {"Choose a mark: "}
              </label>
              <select
                id="mark-select"
                onChange={(e) => markSelect(e.target.value)}
                defaultValue={selectedMark}
              >
                <option value=""></option>
                {refMarks.result.map((item, i) => {
                  return (
                    <option key={i} value={item.id}>
                      {item.carMarkName}
                    </option>
                  );
                })}
              </select>
            </li>
            <li>
              <label htmlFor="model-select" className="text-danger">
                {"Choose a model: "}
              </label>
              <select
                id="model-select"
                onChange={(e) => modelSelect(e.target.value)}
              >
                <option value={-1}></option>
                {refModels.result.map((item, i) => {
                  return (
                    <option key={i} value={item.id}>
                      {item.carModelName}
                    </option>
                  );
                })}
              </select>
            </li>
            <li>
              <div className="d-flex justify-content-center">
                <button onClick={() => test()}>Search</button>
              </div>
            </li>
          </ul>
          <div className="d-flex justify-content-center"></div>
        </div>
      </nav>

      <main className="col-10">
        <div>{JSON.stringify(refData)}</div>
      </main>
    </div>
  );
};

export default Search;
