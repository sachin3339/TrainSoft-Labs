package com.trainsoft.assessment.commons;


import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.to.AppUserTO;
import com.trainsoft.assessment.to.DepartmentVirtualAccountTO;
import com.trainsoft.assessment.to.UserTO;
import com.trainsoft.assessment.value.InstructorEnum;
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
public class AssessmentUserExcelHelper {

    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"Name", "EmailId", "PhoneNumber", "EmployeeId"};
    static String SHEET = "Participants";

    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }

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
                            appUserTO.setPhoneNumber(currentCell.getCellType()== currentCell.getCellType().NUMERIC?
                                    NumberToTextConverter.toText(currentCell.getNumericCellValue()):currentCell.getStringCellValue());
                            break;
                        case 3:
                            appUserTO.setEmployeeId(currentCell.getCellType()== currentCell.getCellType().NUMERIC?
                                    NumberToTextConverter.toText(currentCell.getNumericCellValue()):currentCell.getStringCellValue());
                            break;
                        default:
                            break;
                    }
                    cellIdx++;
                }
                appUserTO.setAccessType(InstructorEnum.AccessType.ALL);
                appUserTO.setStatus(InstructorEnum.Status.ENABLED);
                appUserTO.setSuperAdmin(false);
                appUserTO.setPassword(CommonUtils.generatePassword());
                departmentVirtualAccountTO.setDepartmentRole(InstructorEnum.DepartmentRole.ASSESS_USER);
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