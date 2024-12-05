import React from 'react'
import { CircleArrowLeft } from "lucide-react";
import { Button } from "@headlessui/react";

const BotaoFlecha = () => {
  return (
    <div>
        <Button className="focus:outline-none rounded-full data-[hover]:bg-emerald-300 data-[open]:bg-teal-600 data-[open]: outline-1">
          <CircleArrowLeft size={50} />
        </Button>
    </div>
    
  )
}

export default BotaoFlecha
