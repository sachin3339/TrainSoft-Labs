package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.DepartmentTO;

public interface IDepartmentService {
      DepartmentTO createDepartment(DepartmentTO departmentTO);
      DepartmentTO updateDepartment(DepartmentTO departmentTO);
      DepartmentTO getDepartmentBySid(String departmentSid);
      boolean deleteDepartmentBySid(String deptSid,String deletedBySid);

}
