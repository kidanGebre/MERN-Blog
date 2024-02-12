import { Route, Routes } from "react-router-dom"
import Header from "./component/Header";
import Home from "./component/Home";
import Blog from "./Layout/Blog"
import Login from "./Layout/Login";
import Dashboard from "./Layout/Dashboard";
import { useContext } from "react";
import { userContext } from "./context/userContext";
import Register from "./Layout/Register";
import CreatePost from "./Layout/DashPage/CreatePost";
import DetailPost from "./Layout/DetailPost";
import EditPost from "./Layout/DashPage/EditPost";

function App () {
  const { user } = useContext(userContext)


  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user && <Dashboard />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/blog/detail/:id" element={<DetailPost />} />
        <Route path="/editpost/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
