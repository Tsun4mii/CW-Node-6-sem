import React from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Image from "next/image";

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
      headers: { "Content-Type": "application/json" },
    }
  );
  const content = await response.json();
  const commentsJson = await comments.json();
  console.log(commentsJson);
  return {
    props: { data: content, comments: commentsJson },
  };
};

const Id = ({ data, comments }) => {
  return (
    <DefaultLayout>
      <img src={data.part.img_path} alt="" width={200} height={200} />
      <div className="d-flex">
        {comments.comments.map((obj, i) => (
          <p key={i}>{obj.body}</p>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Id;
