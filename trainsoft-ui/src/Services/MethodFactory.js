import React from 'react'
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className="flx pointer"
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));

  /*
      return course name
      @pram: sid - sid of course
      @pram: courseList - sid of list of all course

  */
  export const courseInfoBySid =(sid,courseList)=> {
    let courseName = ''
      try {
          courseName = courseList.find( res=> res.sid === sid).name
      }catch(err){
        console.error("error occur on courseInfoBySid()",err)
      }
      return courseName
  }
