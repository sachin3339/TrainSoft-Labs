package com.trainsoft.instructorled.commons;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public class ExcelHelper {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"Name", "EmailId", "EmployeeId", "PhoneNumber"};
    static String SHEET = "Participants";

    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }
    public static List<AppUser> excelToAppUsers(InputStream is) {
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
                appUsers.add(appUser);
            }
            workbook.close();
            return appUsers;
        } catch (IOException e) {
            throw new ApplicationException("fail to parse Excel file: " + e.getMessage());
        }
    }
}

