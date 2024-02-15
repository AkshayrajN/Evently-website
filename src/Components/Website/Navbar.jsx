import React, { useRef, useState } from "react";

const Navbar = () => {
  const ref = useRef();
  const [signup, setsignup] = useState(false);
  const [user,setUser]=useState({})
  const [userLogin,setUserLogin]=useState({})
  function handleClick() {
    ref.current.showModal();
  }
  const submitLogin=(e)=>{
    e.preventDefault();
    console.log(userLogin)
    handleLoginSubmit();
  }
  function handleClickClose() {
    ref.current.hideModal();
  }

  function onSubmit() {
    // window.open("https://www.google.com/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(user)
    try{
   const response=await fetch("http://localhost:443/backend/api/testresponse.php",{
      method:"POST",
      //  mode:"no-cors",
      body:JSON.stringify(user),
      headers:{
        'Content-Type':'application/json'
      }
    })
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    const data = await response.json();
    // setStatusCode(200); 
    // Store the response data in state or do something else with it
    console.log(data);
    console.log(data.Status);
    if(data.Status===401){
      console.log("first")
      alert("USER ALREADY exsits");
      return;
    }
  } catch (error) {
    console.error('Error:', error);
  }
  }

// login authentication section-----

async function handleLoginSubmit() {
  // e.preventDefault();
  console.log(userLogin)
  try{
 const response=await fetch("http://localhost:443/backend/api/formlogin.php",{
    method:"POST",
    //  mode:"no-cors",
    body:JSON.stringify(userLogin),
    headers:{
      'Content-Type':'application/json'
    }
  })
  // if (!response.ok) {
  //   throw new Error(`HTTP error! Status: ${response.status}`);
  // }

  const data = await response.json();
  // setStatusCode(200); 
  // Store the response data in state or do something else with it
  console.log(data);
  console.log(data.Status);
  if(data.Status===403){
    console.log("first")
    alert("wrong username or password");
    return;
  }
} catch (error) {
  console.error('Error:', error);
}
}





  const [modalMarkup, setModalMarkup] = useState(
    <div>
      <h3 className="my-3">Username</h3>
      <input type="text" className="mb-4 focus:bg-stone-300" />
      <h3 className="my-3">Password</h3>
      <input type="password" className=" focus:bg-stone-300" />
    </div>
  );

 const handleLogin=(e)=>{
  console.log("First");
  setUserLogin((prev=>({
    ...prev,
    [e.target.name]:e.target.value
  })))
 }
  const handleUser=(e)=>{
    console.log("First");
    setUser((prev=>({
      ...prev,
      [e.target.name]:e.target.value
    })))
  }
  function handleModal(login) {
    setsignup(login);
    const markup = !signup ? (
      <div>
        <h3 className="my-3">Username</h3>
        <input type="text" className="mb-4 focus:bg-stone-300 " name="username" onChange={handleLogin}/>
        <h3 className="my-3">Password</h3>
        <input type="password" className=" focus:bg-stone-300" name="password" onChange={handleLogin} />
      </div>
    ) : (
      <div>
        <h3 className="my-3">First Name</h3>
        <input type="text" className="mb-4 focus:bg-stone-300" name="first_name"   onChange={handleUser} />
        <h3 className="my-3">Last Name</h3>
        <input type="text" className="mb-4 focus:bg-stone-300" name="last_name"  onChange={handleUser} />
        <h3 className="my-3">Email</h3>
        <input type="text" className="mb-4 focus:bg-stone-300" name="email"  onChange={handleUser} />
        <h3 className="my-3">Username</h3>
        <input type="text" className="mb-4 focus:bg-stone-300"  name="username" onChange={handleUser} />
        <h3 className="my-3">Password</h3>
        <input type="password" className=" focus:bg-stone-300" name="password"  onChange={handleUser} />
      </div>
    );
    setModalMarkup(markup);
  }

  return (
    <>
      <dialog
        className=" border-gray-400 rounded-b-xl mx-auto my-auto border-2 bg-stone-950 w-80 h-fit"
        ref={ref}
      >
        <div className="flex items-center justify-around bg-red-500 w-full rounded-b-lg">
          <button
            className={`w-[50%] ${!signup && "bg-black"}`}
            onClick={() => {
              handleModal(true);
              setsignup(false)
            }}
          >
            Log-in
          </button>
          <button
            className={`w-[50%] ${signup && "bg-black"}`}
            onClick={() => {
              handleModal(false);
              setsignup(true);
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="_flex p-10">
          <form onSubmit={handleSubmit}>
            {modalMarkup}
            <button
              onClick={signup? handleSubmit:submitLogin}
              type="submit"
              className=" p-2 border-2 mt-4 rounded-md bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-stone-100"
            >
              Submit
            </button>
            <button
              onClick={onSubmit}
              type="reset"
              className=" p-2 border-2 mt-4 rounded-md bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-stone-100 mx-10"
            >
              Reset
            </button>
          </form>
          <form method="dialog">
            {/* <button
              className=" p-2 border-2 mt-4 rounded-md bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-stone-100"
              onClick={handleClickClose}
            >
              close
            </button> */}
          </form>
        </div>
      </dialog>

      <nav className="flex items-start lg:items-center justify-between m-5 lg:flex-row">
        <div className="_flex lg:flex-row h-8 lg:h-24">
          <div className="_flex lg:flex-row">
            <img
              src="Logo.png"
              className=" h-14 md:h-20 lg:h-[4.5rem] mx-5"
            ></img>
            <h4 className="hidden lg:flex text-md lg:text-2xl mr-12 font-heading_font">
              Evently
            </h4>
          </div>
          <ul className=" _flex lg:flex-row gap-9 m-4 text-sm lg:text-2xl">
            <li>
              <a
                href="#about"
                className="hidden lg:flex transition-colors hover:text-gray-400"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#Features"
                className="hidden lg:flex transition-colors hover:text-gray-400"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#Pricing"
                className="hidden lg:flex transition-colors hover:text-gray-400"
              >
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <button
          onClick={handleClick}
          className=" bg-[#009d41] py-2 px-2  lg:px-8 rounded-3xl _flex lg:flex-row items-center mx-9 transition-all lg:hover:py-3 hover:bg-[#007b20]"
        >
          Get Start
        </button>
      </nav>
    </>
  );
};

export default Navbar;
