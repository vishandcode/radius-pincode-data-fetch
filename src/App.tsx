import axios from "axios";
import { useState } from "react";

export default function App() {
  const api_url = "https://api.postalpincode.in/pincode/";
  const [Data, SetData] = useState<any>([]);
  const [Loading, SetLoading] = useState<boolean>(false);

  return (
    <div className="lg:w-7/12 w-11/12 mx-auto flex flex-col gap-3 p-4">
      <div className="fixed top-0 right-0 left-0 lg:w-7/12 w-11/12 mx-auto p-3  bg-white">
        <label htmlFor="pincode">PinCode</label>
        <input
          id="pincode"
          placeholder="Enter your 6 digit PIN code"
          className="border p-3 w-full rounded-xl "
          type="text"
          onChange={async (event) => {
            if (event.target.value.length === 6) {
              console.log("INPUT DIGITS ARE 6");
              try {
                SetLoading(true);
                const response = await axios.get(
                  `${api_url}${event.target.value}`
                );
                console.log(response?.data[0]?.PostOffice);
                SetData(response?.data[0]?.PostOffice);
              } catch (error) {
                console.error(error);
              } finally {
                SetLoading(false);
              }
            }
          }}
          maxLength={6}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 my-[100px]">
        {Loading && (
          <h1 className="col-span-2 text-center">Fetching Data...</h1>
        )}
        {!Loading &&
          Data?.map((item: any) => (
            <div className="flex  flex-col gap-3 bg-blue-50 p-3 border rounded-xl">
              <div className="">
                <h1>Country</h1>
                <h1 className="font-bold">{item?.Country}</h1>
              </div>
              <div>
                <h1>Block</h1>
                <h1 className="font-bold">{item?.Block}</h1>
              </div>
              <div>
                <h1>Circle</h1>
                <h1 className="font-bold">{item?.Circle}</h1>
              </div>
              <div>
                <h1>Region</h1>
                <h1 className="font-bold">{item?.Region}</h1>
              </div>
              <div>
                <h1>State</h1>
                <h1 className="font-bold">{item?.State}</h1>
              </div>
            </div>
          ))}

        {!Data && !Loading && (
          <h1 className="col-span-2 text-center">No Results</h1>
        )}
      </div>
    </div>
  );
}
