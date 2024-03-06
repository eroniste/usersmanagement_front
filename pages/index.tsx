import Navbar from "@/components/layouts/Navbar";




export default function Home(){
  return(
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Our Website</h1>
        <p className="text-gray-600 mb-6">We propose solutions so you can mange easily your users</p>
        <div className="flex justify-center">
          <a href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4">Sign Up</a>
          <a href="/login" className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">Log In</a>
        </div>
      </div>
    </div>
  )
}











Home.getLayout = function getLayout(page) {
  return (
    <>
      <Navbar></Navbar>
      <div>{page}</div>
    </>
  );
};