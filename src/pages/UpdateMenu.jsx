import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useLoaderData, useParams } from "react-router";

const UpdateMenu = () => {
  // params id
  const { id } = useParams();
  console.log(id);
  // loader data
  const menu = useLoaderData();
  console.log(menu);
  // auth
  const { user } = useAuth();
  // states
  const [categories, setCategories] = useState([]);
  const [menuTypes, setMenuTypes] = useState([]);
  const [isAvailable, setIsAvailable] = useState(menu[0].isAvailable);
  const [featured, setFeatured] = useState(menu[0].featured);

  // fetch category
  useEffect(() => {
    axios
      .get(`http://localhost:5000/category`)
      .then((res) => setCategories(res.data));
  }, []);

  // fetch menu types
  useEffect(() => {
    axios
      .get(`http://localhost:5000/menu-types`)
      .then((res) => setMenuTypes(res.data));
  }, []);

  // on submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    // with form api
    const formData = new FormData(e.target);
    // get all the values
    const values = Object.fromEntries(formData.entries());
    const { allergens, imgGallery, ingredients, price, ...newValue } = values;
    const finalCopy = {
      ...newValue,
      addedBy: user?.email,
      allergens: allergens.split("\n"),
      imgGallery: imgGallery.split("\n"),
      ingredients: ingredients.split("\n"),
      price: parseFloat(price),
      isAvailable,
      featured,
    };
    console.log(finalCopy);
    axios
      .put(`http://localhost:5000/update-menu/${id}`, finalCopy)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // return code
  return (
    <div className="w-[80%] mx-auto my-10 p-5">
      <form className="" onSubmit={handleSubmit}>
        {/* parent div */}
        {menu?.map((item, idx) => (
          <div className="w-[80%] mx-auto" key={idx}>
            {/* basic info parent */}
            <div className="space-y-5">
              <div className="">
                <h1 className="text-2xl opacity-80 font-bold">
                  Basic Information
                </h1>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* menu item name */}
                <fieldset className="">
                  <label className="floating-label">
                    <span>Menu Item Name</span>
                    <input
                      type="text"
                      placeholder="Place Menu Item Name"
                      defaultValue={item?.name}
                      name="name"
                      className="input input-md"
                    />
                  </label>
                </fieldset>
                {/* menu item name */}
                {/* category select */}
                <fieldset className="">
                  <label className="select">
                    <span className="label">Category</span>
                    <select
                      className=""
                      name="category"
                      defaultValue={item?.category}
                    >
                      {/* <option>Personal</option>
                    <option>Business</option> */}
                      {categories?.map((category, idx) => (
                        <option key={idx}> {category?.name} </option>
                      ))}
                    </select>
                  </label>
                </fieldset>
                {/* category select */}

                {/* menu type select */}
                <fieldset className="">
                  <label className="select">
                    <span className="label">Menu Type </span>
                    <select
                      className=""
                      name="menuType"
                      defaultValue={item?.menuType}
                    >
                      {menuTypes?.map((menuType, idx) => (
                        <option key={idx}> {menuType?.name} </option>
                      ))}
                    </select>
                  </label>
                </fieldset>
                {/* menu type select */}

                {/* description */}
                <fieldset className="col-span-3">
                  <label className="floating-label">
                    <span>Description</span>
                    <textarea
                      defaultValue={item?.description}
                      className="textarea h-24 w-full"
                      name="description"
                      placeholder="Put some nice description"
                    ></textarea>
                  </label>
                </fieldset>
                {/* end of description */}
              </div>
            </div>
            {/* basic info end */}
            {/* Pricing and Availability */}
            <div className="space-y-5 my-5">
              <div className="">
                <h1 className="opacity-80 text-xl font-bold">
                  Pricing and Availability
                </h1>
              </div>
              <div className="grid grid-cols-3 gap-6 items-center">
                {/* menu item price */}
                <fieldset className="">
                  <label className="floating-label">
                    <span>Menu Item Price</span>
                    <input
                      type="text"
                      defaultValue={item?.price}
                      placeholder="Price"
                      name="price"
                      className="input input-md"
                    />
                  </label>
                </fieldset>
                {/* end of menu item price */}
                {/* is available checkbox */}
                <fieldset className="text-center">
                  <label className="label">
                    Available
                    <input
                      type="checkbox"
                      defaultChecked={item?.isAvailable}
                      className="checkbox"
                      onClick={() => setIsAvailable(!isAvailable)}
                    />
                  </label>
                </fieldset>
                {/* end of is available checkbox */}

                {/* is featured checkbox */}
                <fieldset className="text-center">
                  <label className="label">
                    Featured
                    <input
                      type="checkbox"
                      defaultChecked={item?.featured}
                      className="checkbox"
                      onClick={() => setFeatured(!featured)}
                    />
                  </label>
                </fieldset>
                {/* end of is featured checkbox */}
              </div>
            </div>
            {/* end of pricing and availability */}
            {/* Menu image and gallery */}
            <div className="space-y-5 my-5">
              <div className="">
                <h1 className="opacity-80 text-xl font-bold">
                  Media & Display
                </h1>
              </div>
              <div className="grid grid-cols-4 gap-6 items-center">
                {/* menu item image */}
                <fieldset className="col-span-2">
                  <label className="floating-label">
                    <span>Menu Image</span>
                    <input
                      type="url"
                      defaultValue={item?.menuImg}
                      placeholder="Put valid Url"
                      name="menuImg"
                      className="input input-md w-full"
                    />
                  </label>
                </fieldset>
                {/* end of menu item image */}
                {/* image alt text */}
                <fieldset className="col-span-2 w-full">
                  <label className="floating-label">
                    <span>Image Alt text</span>
                    <input
                      type="text"
                      defaultValue={item?.imageAltText}
                      placeholder="Image alt text"
                      name="imageAltText"
                      className="input input-md w-full"
                    />
                  </label>
                </fieldset>
                {/* end image alt text */}

                {/* gallery image area */}
                <fieldset className="col-span-4">
                  <label className="floating-label">
                    <span>Image Gallery</span>
                    <textarea
                      defaultValue={item?.imgGallery.join("\n")}
                      className="textarea h-24 w-full"
                      name="imgGallery"
                      placeholder="Put every Url in a new line"
                    ></textarea>
                  </label>
                </fieldset>
                {/* end of is featured checkbox */}
              </div>
            </div>
            {/* end of menu image and gallery */}
            {/* tags and ratings */}
            <div className="space-y-5 my-5">
              <div className="">
                <h1 className="opacity-80 text-xl font-bold">Ratings</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* rating */}
                <fieldset className="">
                  <label className="floating-label">
                    <span>Rating</span>
                    <input
                      type="text"
                      placeholder="Ratings of the item"
                      defaultValue={item?.rating}
                      name="rating"
                      className="input input-md"
                    />
                  </label>
                </fieldset>
                {/* end rating */}
              </div>
            </div>
            {/* end of tags and ratings */}
            {/* ingredients and allergens */}
            <div className="space-y-5 my-5">
              <div className="">
                <h1 className="opacity-80 text-xl font-bold">
                  Ingredients and Allergens
                </h1>
              </div>
              <div className="space-y-4">
                {/* tags */}
                <fieldset className="">
                  <label className="floating-label">
                    <span>Ingredients</span>
                    <textarea
                      className="textarea h-24 w-full"
                      name="ingredients"
                      placeholder="Put every ingredients in new line"
                      defaultValue={item?.ingredients.join("\n")}
                    ></textarea>
                  </label>
                </fieldset>
                {/* end of tags */}

                {/* classification */}
                <fieldset className="">
                  <label className="floating-label">
                    <span>Allergens</span>
                    <textarea
                      className="textarea h-24 w-full"
                      name="allergens"
                      placeholder="Put every allergens in new line"
                      defaultValue={item?.allergens.join("\n")}
                    ></textarea>
                  </label>
                </fieldset>
                {/* end classification */}
              </div>
              {/* end of ingredients and allergens */}
            </div>
            {/* ingredients and allergens */}
            <div className="mb-10 mt-10">
              <input
                type="submit"
                value="Submit"
                className="btn btn-outline w-full"
              />
            </div>
          </div>
        ))}
        {/* end of parent div */}
      </form>
    </div>
  );
};

export default UpdateMenu;
