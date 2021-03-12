package com.trainsoft.instructorled.commons;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.to.AppUserTO;
import com.trainsoft.instructorled.to.DepartmentTO;
import com.trainsoft.instructorled.to.DepartmentVirtualAccountTO;
import com.trainsoft.instructorled.to.UserTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@AllArgsConstructor
public class ExcelHelper {

    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"Name", "EmailId", "EmployeeId", "PhoneNumber","AccessType","DepartmentName"};
    static String SHEET = "Participants";

    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }
    /*public static List<AppUser> excelToAppUsers(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();
            List<AppUser> appUsers = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();
                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }
                Iterator<Cell> cellsInRow = currentRow.iterator();
                AppUser appUser = new AppUser();
                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    switch (cellIdx) {
                        case 0:
                            appUser.setName(currentCell.getStringCellValue());
                            break;
                        case 1:
                            appUser.setEmailId(currentCell.getStringCellValue());
                            break;
                        case 2:
                            appUser.setEmployeeId(currentCell.getCellType()== currentCell.getCellType().NUMERIC?
                                    NumberToTextConverter.toText(currentCell.getNumericCellValue()):currentCell.getStringCellValue());
                            break;
                        case 3:
                            appUser.setPhoneNumber(currentCell.getCellType()== currentCell.getCellType().NUMERIC?
                                    NumberToTextConverter.toText(currentCell.getNumericCellValue()):currentCell.getStringCellValue());
                            break;
                        case 4:
                            appUser.setAccessType(InstructorEnum.AccessType.valueOf(currentCell.getStringCellValue()));
                            break;

                        default:
                            break;
                    }
                    cellIdx++;
                }
                appUser.generateUuid();
                appUser.setPassword(CommonUtils.generatePassword());
                appUsers.add(appUser);
            }
            workbook.close();
            return appUsers;
        } catch (IOException e) {
            throw new ApplicationException("fail to parse Excel file: " + e.getMessage());
        }
    }*/

    public static List<UserTO> excelToUserTO(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();
            List<UserTO> userTOList = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();
                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }
                Iterator<Cell> cellsInRow = currentRow.iterator();
                UserTO userTO=new UserTO();
                AppUserTO appUserTO=new AppUserTO();
                DepartmentTO departmentTO=new DepartmentTO();
                DepartmentVirtualAccountTO departmentVirtualAccountTO=new DepartmentVirtualAccountTO();
                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    switch (cellIdx) {
                        case 0:
                            appUserTO.setName(currentCell.getStringCellValue());
                            break;
                        case 1:
                            appUserTO.setEmailId(currentCell.getStringCellValue());
                            break;
                        case 2:
                            appUserTO.setEmployeeId(currentCell.getCellType()== currentCell.getCellType().NUMERIC?
                                    NumberToTextConverter.toText(currentCell.getNumericCellValue()):currentCell.getStringCellValue());
                            break;
                        case 3:
                            appUserTO.setPhoneNumber(currentCell.getCellType()== currentCell.getCellType().NUMERIC?
                                    NumberToTextConverter.toText(currentCell.getNumericCellValue()):currentCell.getStringCellValue());
                            break;
                        case 4:
                            appUserTO.setAccessType(InstructorEnum.AccessType.valueOf(currentCell.getStringCellValue()));
                            break;
                        case 5:
                            departmentTO.setName(currentCell.getStringCellValue());
                            break;
                        default:
                            break;
                    }
                    cellIdx++;
                }
                appUserTO.setStatus(InstructorEnum.Status.ENABLED);
                appUserTO.setSuperAdmin(false);
                appUserTO.setPassword(CommonUtils.generatePassword());
                departmentVirtualAccountTO.setDepartment(departmentTO);
                departmentVirtualAccountTO.setDepartmentRole(InstructorEnum.DepartmentRole.LEARNER);
                userTO.setRole(InstructorEnum.VirtualAccountRole.USER);
                userTO.setDepartmentVA(departmentVirtualAccountTO);
                userTO.setAppuser(appUserTO);
                userTOList.add(userTO);
            }
            workbook.close();
            return userTOList;
        } catch (IOException e) {
            throw new ApplicationException("fail to parse Excel file: " + e.getMessage());
        }
    }
}