import React from 'react'

const Card = () => {
  return (
    <div class="bg-gray-100 flex flex-col justify-center">
      <div class="relative m-3 flex flex-wrap mx-auto justify-center">
        <div class="min-w-[340px]flex flex-col group">
          <div
            class="h-48 md:h-56 lg:h-[24rem] w-full bg-red-500 border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">

            <img src="https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2023/2023-fat-bob-114/2023-fat-bob-114-f85/2023-fat-bob-114-f85-motorcycle.jpg"
              class="object-cover w-full h-full scale-100 group-hover:scale-110 transition-all duration-400"
              alt=""/>

              <div
                class="absolute z-10 border-4 border-primary w-[95%] h-[95%] invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500">
              </div>

          </div>
          <a href="#"
            class=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-1">
            Motor Cycle Name</a>


          <p class="mb-4 font-light  text-sm md:text-sm text-center text-gray-400">Lorem ipsum dolor
            sit
            amet, consectetur adipisicing.</p>

          <div class="flex justify-center gap-x-3">
            <a href="#"
              class=" px-5 py-2 border border-primary text-primary hover:bg-primary  transition-all outline-none bg-black border-black text-white hover:text-black hover:bg-white font-bold">
              Add</a>
            <a href="#"
              class="px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all outline-none bg-white border-black text-black hover:text-white hover:bg-black font-bold">
              View</a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Card;