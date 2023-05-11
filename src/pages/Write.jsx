import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {  useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Write = () => {
  const location = useLocation();
  
  // const [currentUser, setCurrentUser] = useState(null);
  // const state = useLocation().state
  const state = location.state || {};
  // const [value, setValue] = useState(state?.title || "");
  // const [title, setTitle] = useState(state?.desc || "");
  const [value, setValue] = useState(state?.desc || ""); // should be desc
  const [title, setTitle] = useState(state?.title || ""); // should be title      
  const [file, setFile] = useState(null);
  // const [cat, setCat] = useState(state?.cat || "");
  const [cat, setCat] = useState(state?.cat || ""); // should be cat


  const navigate = useNavigate()
  const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");


  const upload = async () => {
    try{
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("http://127.0.0.1:8080/api/posts/upload", formData)
      // console.log(res.data)
      return res.data
    } catch(error){
      // console.log(error);
    }
  }

  // const handleClick = async e=> {
  //   e.preventDefault()
  //   const imgUrl = await upload()

  //   // const today = new Date();
  //   // console.log(today);
  //   // console.log(date);

  //   try {
  //     state ? await axios.put(`http://localhost:8080/api/posts/${state.id}`, {
  //       title, 
  //       desc:value,
  //       cat,
  //       img:file ? imgUrl :""
  //     }) 
  //     : await axios.post(`http://localhost:8080/api/posts/`, {
  //       title:value,
  //       desc:title,
  //       cat, 
  //       img:file ? imgUrl :"",
  //       date: format(new Date(), "yyyy-MM-dd HH:mm:ss")
  //     });
  //     navigate("/")
  //   }catch(error) {
  //     console.log(error)
  //   }
  // }

  // console.log(value);

  const handleClick = async e => {
    e.preventDefault();
    const imgUrl = await upload();
  
    try {
      if (state.id) {
        await axios.put(`http://localhost:8080/api/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
        });
      } else {
        await axios.post(`http://localhost:8080/api/posts/`, {
          title: value, // should be value
          desc: title, // should be desc
          cat,
          img: file ? imgUrl : "",
          date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        });

        // await axios.post(`http://localhost:8080/api/posts/`, {
        //   title: value,
        //   desc: title, // should be desc
        //   cat,
        //   img: file ? imgUrl : "",
        //   date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        // });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder="Title" onChange={e=>setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          {/* <span>
            <b>Staus:</b>Draft 
          </span> */}
          <span>
            <b>Visibility:</b>Public
          </span>
          {/* <input style={{ display: "none" }} type="file" id="file" name="file" onChange={e=>setFile(e.target.files[0])} /> */}
          <input type="file" id="file" name="file" onChange={e=>setFile(e.target.files[0])} />
          <label className="file" htmlFor="file"> Upload Image </label>
          <div className="buttons">
            <button>Save as a Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "Music"} name="cat" value="Music" id="Music" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="Music">Music </label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "Baseball"} name="cat" value="Baseball" id="Baseball" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="baseball">Baseball</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === "Disney"} name="cat" value="Disney" id="Disney" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="disney">Disney</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === "Science"} name="cat" value="Science" id="Science" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === "Technology"} name="cat" value="Technology" id="Technology" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "Food"} name="cat" value="Food" id="Food" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;