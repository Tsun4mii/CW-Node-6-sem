import { useEffect, useMemo, useState } from "react";
import Partstable from "../../components/admin_components/PartsTable";
import Adminsidebar from "../../components/admin_components/AdminSidebar";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import Link from "next/link";
import Modalwindow from "../../components/ModalWindow";

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/entities/parts`,
    {
      method: "POST",
    }
  );
  const content = await response.json();

  return {
    props: { data: content },
  };
};

const Parts = ({ data }) => {
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
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "In stock",
      accessor: "in_stock",
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
            pathname: "admin/parts/edit/[id]",
            query: { id: props.row.original.id },
          }}
          as={`/admin/parts/edit/${props.row.original.id}`}
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
        <Partstable columns={columns} data={data.parts} />
      </div>
      <Link href="/admin/points/add" passHref>
        <button className="btn">Add part</button>
      </Link>
      <Modalwindow show={showState} toggleModal={closeModal} id={deleteId} />
    </Adminsidebar>
  );
};

export default Parts;
