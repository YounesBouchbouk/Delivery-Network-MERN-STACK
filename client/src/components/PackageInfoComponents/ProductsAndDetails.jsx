import React from "react";

const ProductsAndDetails = ({ data }) => {
  return (
    <div className="w-full grid grid-cols-2  md:grid-cols-2 p-4">
      <div className="grid col-span-1  grid-cols-1">
        <div className="flex flex-col justify-start p-2">
          <p className="text-sm font-robot">Package Information :</p>
          <div className="w-full h-0.5 bg-orange-400 "></div>
        </div>

        <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1">
          <div className="col-span-1 justify-items-center items-center">
            <p className="font-bold  text-sm font-Play"> Title :</p>
          </div>
          <div className="col-span-2 justify-items-center items-center">
            <p className="text-sm">{data.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1">
          <div className="col-span-1 justify-items-center items-center">
            <p className="font-bold text-sm font-Play"> Descition :</p>
          </div>
          <div className="col-span-2 justify-items-center items-center">
            <p className="text-sm">{data.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-5 col-span-1  justify-items-center items-center my-1">
          {/* box4 item 1 */}
          <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold font-Play uppercase text-sm">Fragile</p>
            </div>
            <div className="col-span-1 justify-items-center items-center">
              <p>{String(data.isFragile)}</p>
            </div>
          </div>

          {/* box4 item 2 */}
          <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold font-Play uppercase text-sm">
                Collecteur
              </p>
            </div>
            <div className="col-span-1 justify-items-center items-center">
              <p>{String(data.needsCollect)}</p>
            </div>
          </div>

          {/* box4 item 1 */}
          <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold font-Play uppercase text-sm">width</p>
            </div>
            <div className="col-span-1 justify-items-center items-center">
              <p>
                <p>{data.dimentions?.width}</p>
                in
              </p>
            </div>
          </div>

          {/* box4 item 2 */}
          <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold font-Play uppercase text-sm">height</p>
            </div>
            <div className="col-span-1 justify-items-center items-center">
              <p>{data.dimentions?.height} in</p>
            </div>
          </div>

          {/* box4 item 3 */}
          <div className="grid grid-cols-1 col-span-1 justify-items-center items-center p-2">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold font-Play uppercase text-sm">Lenght</p>
            </div>
            <div className="col-span-1 justify-items-center items-center">
              <p>{data.dimentions?.lenght} in</p>
            </div>
          </div>
        </div>

        {/* for dimentions */}

        <div className="flex flex-col justify-start p-2">
          <p className="text-sm font-robot">Receiver Information :</p>
          <div className="w-full h-0.5 bg-orange-400 "></div>
        </div>

        <div className="grid grid-cols-3 col-span-1  justify-items-center items-center my-1 ">
          {/* item */}
          <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1 ">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold text-sm font-Play"> Nome :</p>
            </div>
            <div className="col-span-2 justify-items-center items-center">
              <p className="text-sm"> {data.receiver?.name}</p>
            </div>
          </div>

          {/* item */}
          <div className="grid grid-cols-3 col-span-2 justify-items-center items-center my-1">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold text-sm font-Play"> Email :</p>
            </div>
            <div className="col-span-2 justify-items-center items-center">
              <p className="text-sm"> {data.receiver?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 col-span-1  justify-items-center items-center my-1">
          {/* item */}

          <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold  text-sm font-Play"> Adress :</p>
            </div>
            <div className="col-span-2 justify-items-center items-center">
              <p className="text-sm"> {data.receiver?.address}</p>
            </div>
          </div>

          {/* item */}
          <div className="grid grid-cols-3 col-span-1 justify-items-center items-center my-1">
            <div className="col-span-1 justify-items-center items-center">
              <p className="font-bold text-sm font-Play"> Note :</p>
            </div>
            <div className="col-span-2 justify-items-center items-center">
              <p className="text-sm"> {data.receiver?.note}</p>
            </div>
          </div>

          {/* item */}
        </div>
      </div>

      {/* product products */}
      <div className="grid col-span-1 grid-cols-1">
        <div className="flex flex-col justify-start p-2">
          <p className="text-sm font-robot">Products Information :</p>
          <div className="w-full h-0.5 bg-orange-400 "></div>
        </div>
        <div className="w-full ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>

                <th scope="col" class="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {data.packagedetails?.orderLines?.products.map((item, index) => {
                return (
                  <tr
                    key={index}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {item.title}
                    </th>
                    <td class="px-6 py-4">{item.Description}</td>
                    <td class="px-6 py-4">{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsAndDetails;
