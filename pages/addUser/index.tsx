
import Navbar from "../../components/layouts/Navbar";
import {UsersForm} from "../../components/UsersForm"


export default UsersForm;
UsersForm.getLayout = function getLayout(page) {
    return (
      <>
      <Navbar></ Navbar>
      <div><h1>Add a New User</h1></div>
      <div>{page}</div>
      </>
    )
  }