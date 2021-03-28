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
  export const UploadAttachments = async (link, file, token) => {
    return new Promise((resolve, reject) => {
        let data = new FormData();
        for (let i = 0, l = file.length; i < l; i++)
            data.append("files", file[i])
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            let response = null;
            try {
                response = JSON.parse(this.responseText);
            } catch (err) {
                response = this.responseText
            }
            if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
                resolve([response, this.status, this.getAllResponseHeaders()]);
            } else if (this.readyState === 4 && !(this.status >= 200 && this.status <= 299)) {
                reject([response, this.status, this.getAllResponseHeaders()]);
            }
        });
        xhr.open("POST", link);
        xhr.setRequestHeader("Authorization", token);
        xhr.send(data);
    })
}