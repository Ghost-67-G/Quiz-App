import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState("");
  return (
    <main className={`body`}>
      <div className={`container`}>
        <div>
        <h1 className={`font-semibold text-3xl`}>
          Food Quiz App By Ayan Naseer
        </h1>
        <div className="py-10">
          {name ? (
            <div>
              <h3 className="text-xl font-semibold">
                Please select the difficulty level:
              </h3>
              <select
              className="mx-3"
                onChange={() => {
                  router.push(`/quiz?name=${name}&level=${event.target.value}`)    
                  console.log(event.target.value);
                }}
              >
                <option>Select Difficulty Level</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold">Please Enter Your Name:</h3>
              <form
                onSubmit={() => {
                  event.preventDefault();
                  setName(event.target[0].value);
                }}
              >
                <input
                  type="text"
                  className="px-3 mx-3 text-black"
                  placeholder="Your Lovely Name"
                />
                <button className="bg-sky-400  px-3 rounded-xl">Confirm</button>
              </form>
            </div>
          )}
        </div>
        </div>
      </div>
    </main>
  );
}
