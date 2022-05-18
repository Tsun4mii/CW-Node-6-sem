import { useState } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import styles from "../../styles/Part.module.css";
import Image from "next/image";
import { BsFillCheckCircleFill, BsFillDashCircleFill } from "react-icons/bs";

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/parts/getById`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: context.query.id,
      }),
    }
  );
  const comments = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/part/comment/${context.query.id}`,
    {
      method: "GET",
    }
  );
  const content = await response.json();
  const commentsJson = await comments.json();
  return {
    props: { data: content, comments: commentsJson },
  };
};

const Id = ({ data, comments }) => {
  const [showForm, setShowForm] = useState(false);
  const [comData, setComData] = useState("");

  const showForme = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };
  //TODO: solve problem with force refresh
  async function useForceUpdateComms() {
    const [newComms, setNewComms] = useState();
    return async () => {
      const content = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/part/comment/${data.part.id}`,
        {
          method: "GET",
        }
      );

      setNewComms(await content.json());
    };
  }

  const sendComment = async (e) => {
    e.preventDefault();
    const request = fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/part/comment`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          partId: data.part.id,
          body: comData,
        }),
      }
    );
  };

  async function addToBucket(partId) {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/bucket`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          partId: partId,
        }),
      }
    );
    if (request.ok) {
      return alert("Part has been added to bucket");
    }
  }
  return (
    <DefaultLayout>
      <div className={styles.b_content}>
        <div>
          <h6>
            {data.part.category.categoryName +
              " > " +
              data.part.carMark.carMarkName +
              " > " +
              data.part.carModel.carModelName}
          </h6>
        </div>
        <div>
          <h1>{data.part.name}</h1>
        </div>
        <div className="d-flex justify-content-around">
          <div className={styles.part_img_div}>
            <img src={data.part.img_path} alt="" width={200} height={200} />
          </div>
          <div className="d-inline ms-10">
            <h3>{data.part.price + "$"}</h3>
            <p>
              {data.part.in_stock > 0 ? (
                <BsFillCheckCircleFill color="green" />
              ) : (
                <BsFillDashCircleFill color="red" />
              )}
              {" " + "In stock: " + data.part.in_stock}
            </p>
            <p>
              {"For car mark: "}{" "}
              <a
                href={`http://localhost:3000/search?mark=${data.part.carMark.carMarkName}`}
              >
                {data.part.carMark.carMarkName}
              </a>
            </p>
            <p>{"For car model: " + data.part.carModel.carModelName}</p>
            <button
              onClick={() => addToBucket(data.part.id)}
              className={styles.product_button}
            >
              Add to bucket
            </button>
          </div>
        </div>
        <form>
          <button onClick={showForme} className={styles.product_button}>
            Left a comment
          </button>
        </form>
        {showForm && (
          <form onSubmit={sendComment}>
            <label htmlFor="comBody">Comment: </label>
            <input
              name="comBody"
              className="form-control"
              onChange={(e) => setComData(e.target.value)}
            ></input>
            <input type="submit" className={styles.product_button} />
          </form>
        )}
        <div className="d-block">
          {comments.comments.map((obj, i) => (
            <>
              <div className="d-block">
                <div className="d-inline">
                  <div className={styles.comment}>
                    <p key={i}>{obj.user.email} : </p>
                    <p key={i}>{" " + obj.body}</p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Id;
