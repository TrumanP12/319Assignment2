import logo from "./exoticFishLogo.png";
import "./App.css";
import React, { useState } from "react";
import { Products } from "./Products";

function addToCart(tag){
  console.log("Object added to cart");
}
const App = () => {
  console.log("Step 1 : load Products in a useState.");
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [query, setQuery] = useState("");
  function viewCart(tag) {
    console.log("Step 4 : in handleClick", tag);
    
    // modify useState

    
  }


  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(
      "Step 6 : in handleChange, Target Value :",
      e.target.value,
      " Query Value :",
      query
    );
    const results = Products.filter((eachProduct) => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };
  return (
    <div className="float">
      <div
        className="bg-blue-800"
        style={{ Width: "100%", alignContent: "center" }}
      >
        {}
        <div className="px-2 py-1">
          <h1 className="text-3xl mb-2 font-bold text-white">
            {" "}
            Exotic Fish for Purchase{" "}
            <div
              style={{textAlign : "right", paddingRight: "50px"}}
              
              >
            <button
                key={"Checkout"}
                className="bg-blue-400 rounded-full px-4 py-3 text-lg font-bold text-white-700 mr-2 mt-2 text-align-right"
                onClick={() => {
                  viewCart();
                }}
              >
                View Cart     🛒   
                
              </button>
              </div>
            {/* <img className="max-h-80 max-w-50 object-center object-cover" src={logo} alt="Exotic Fish" /> */}
          </h1>
          
          <p className="text-gray-700 text-white">
            Created By -{" "}
            <b style={{ color: "white" }}>
              Truman Patterson & Robert Study
            </b>
          </p>


          <div className="py-10">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="search"
              value={query}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {console.log(
          "Before render :",
          Products.length,
          ProductsCategory.length
        )}
        {render_products(ProductsCategory)}
      </div>
      
    </div>
  );
};

const render_products = (ProductsCategory) => {
  
  return (
    <div className="category-section fixed">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
        Products ({ProductsCategory.length})
      </h2>
      <div
        className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
        style={{ maxHeight: "350px", overflowY: "scroll" }}
      >
        {/* Loop Products */}
        {ProductsCategory.map((product, index) => (
          <div key={index} className="group relative shadow-lg">
            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
              <img
                alt="Product Image"
                src={product.image}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="flex justify-between p-3">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      {product.title}
                    </span>
                  </a>

                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Description: {product.description}
                </p>
              </div>
              <p className="text-sm font-medium text-green-600">
                ${product.price}
              </p>
            </div>
            <div>
            <button
                key={"Add To Cart"}
                className="bg-blue-400 rounded-full px-4 py-3 text-sm font-bold text-white-700 mr-2 mt-2 text-align-right"
                onClick={() => {
                  addToCart();
                }}
              >
                Add to Cart
                
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
