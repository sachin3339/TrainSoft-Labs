package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.DepartmentTO;

import java.util.List;

public interface IDepartmentService {
      DepartmentTO createDepartment(DepartmentTO departmentTO);
      DepartmentTO updateDepartment(DepartmentTO departmentTO);
      DepartmentTO getDepartmentBySid(String departmentSid);
      boolean deleteDepartmentBySid(String deptSid,String deletedBySid);
      List<DepartmentTO> getDepartments();

}
