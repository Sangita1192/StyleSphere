import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveProductCatAsPerParentCat } from "../redux/slices/productCategorySlice";


export function MenMegaMenu({ menuHover, setMenuHover, megaMenuHover, setMegaMenuHover }) {
  const category = menuHover;
  const dispatch = useDispatch();
  const [productCategory, setProductCat] = useState([]);

  const productCat = useSelector((state) => state.productCategory.value);

  useEffect(() => {
    if (category) {
      dispatch(fetchActiveProductCatAsPerParentCat(category));
    }
  }, [dispatch, category])

  useEffect(() => {
    if (productCat) {
      setProductCat(productCat);
    };
  }, [productCat])

  return (
    <div
      onMouseOver={() => setMegaMenuHover(true)}
      onMouseOut={() => setMegaMenuHover(false)}
      className={`${menuHover || megaMenuHover ? "opacity-100 visible" : "opacity-0 invisible"} duration-500 w-full absolute left-0 top-[90%] bg-[#E8F2FB]`}>
      <div className="grid grid-cols-[50%_auto] gap-[20px] p-5">
        <div className="flex gap-[30px] text-black ">
          {
            productCategory.length > 0 ?
              <>
                <ul className="w-[50%]">
                  <li className="cursor-pointer hover:underline py-[5px]">
                    Featured Category
                  </li>
                  <li className="cursor-pointer hover:underline py-[5px]">
                    New Arrivals
                  </li>
                  <li className="cursor-pointer hover:underline py-[5px]">
                    Best Sellers
                  </li>
                </ul>
                <ul className="w-[50%]">
                  {productCategory.map((product) => (

                    <li className="cursor-pointer hover:underline py-[5px]">{product.name}</li>
                  ))}
                </ul>
              </>
              :
              <p className="text-[20px] text-center ">NO product Category Exist</p>
          }

        </div>
        <div className="grid grid-cols-2 gap-10">
          <figure className="w-full relative">
            <img className="h-full w-full cursor-pointer shadow-md object-cover object-center" src="https://www.frankandoak.com/cdn/shop/files/Menu_tile-3_a8945a6a-262a-4161-a9a2-b5608646defd_600x.jpg?v=1725974015" alt="" />
            <h4 className="text-[18px] font-medium text-white absolute bottom-5 left-5">Sweaters</h4>
          </figure>
          <figure className="w-full  relative">
            <img className="h-full w-full cursor-pointer shadow-md object-cover object-center" src="https://www.frankandoak.com/cdn/shop/files/Menu_tile-2_03931173-c63e-46a0-9ac9-d2d8793a230b_600x.jpg?v=1725974013" alt="" />
            <h4 className="text-[18px] font-medium text-white absolute bottom-5 left-5">Jackets</h4>
          </figure>
        </div>
      </div>
    </div>
  );
}
