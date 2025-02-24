import React from 'react'

export default function BreadCrumb({prop1,prop2,prop3}) {
  return (
    <div className="text-[13px] font-medium pb-3">
          {" "}
          <span className="hover:underline underline-offset-2 cursor-pointer">{prop1}</span> /{" "}
          <span className="hover:underline underline-offset-2 cursor-pointer">
            {prop2}
          </span>{" "}
          / <span className="cursor-default">{prop3}</span>
        </div>
  )
}
