const homePage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ">
              Button 1
            </button>
            <button className="px-10 py-5 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Button 2
            </button>
          </div>
        </div>
      );
 }
 
 export default homePage;