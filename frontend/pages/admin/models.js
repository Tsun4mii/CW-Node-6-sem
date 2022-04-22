import { useEffect, useMemo, useState } from "react";
import Adminsidebar from "../../components/admin_components/AdminSidebar";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import Partstable from "../../components/admin_components/PartsTable";
import Link from "next/link";
import Modalwindow from "../../components/ModalWindow";

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/models`,
    {
      method: "GET",
    }
  );
  const content = await response.json();

  return {
    props: { data: content },
  };
};

const Models = ({ data }) => {
  const [showState, setShowState] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const closeModal = () => setShowState(false);
  const openModal = (e, props) => {
    setDeleteId(props.row.original.id);
    setShowState(true);
  };

  const columns = useMemo(() => [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "carModelName",
    },
    {
      Header: "Delete",
      Cell: (props) => (
        <button className="btn" onClick={(e) => openModal(e, props)}>
          <BsFillTrashFill />
        </button>
      ),
    },
    {
      Header: "Update",
      Cell: (props) => (
        <Link
          href={{
            pathname: "admin/models/edit/[id]",
            query: { id: props.row.original.id },
          }}
          as={`/admin/models/edit/${props.row.original.id}`}
        >
          <button className="btn">
            <BsPencil />
          </button>
        </Link>
      ),
    },
  ]);
  return (
    <Adminsidebar>
      <div className="d-flex justify-content-center">
        <Partstable columns={columns} data={data.models} />
      </div>
      <Link href="/admin/models/add" passHref>
        <button className="btn">Add model</button>
      </Link>
      <Modalwindow
        show={showState}
        toggleModal={closeModal}
        id={deleteId}
        affectedEntity={"models"}
      />
    </Adminsidebar>
  );
};

export default Models;
