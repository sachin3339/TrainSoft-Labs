package com.trainsoft.instructorled.commons;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.to.CommonRes;
import com.trainsoft.instructorled.to.FileTO;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class AWSUploadClient {

    private AmazonS3 s3Client;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    @Value("${amazonProperties.accessKey}")
    private String accessKey;
    @Value("${amazonProperties.secretKey}")
    private String secretKey;


    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3Client = new AmazonS3Client(credentials);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(convFile);
            fos.write(file.getBytes());
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return convFile;
    }

    private String generateFileName(MultipartFile multiPart) {
        return multiPart.getOriginalFilename()+"_"+new Date().getTime();
    }

    private void uploadFileTos3bucket(String fileName, File file) {
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));

    }

    public CommonRes  uploadFiles(MultipartFile[] files) {
        FileTO message;
        List<FileTO> fileNames = new ArrayList<>();
        try {
            for (MultipartFile file : Arrays.asList(files)) {
                message=uploadFile(file);
                fileNames.add(message);
            }
        }catch (Exception e) {
            throw new ApplicationException("while uploading files, throwing error");
        }
        return new CommonRes(JsonUtils.toJson(fileNames));
    }

   // public String uploadFile(MultipartFile multipartFile) {
    public FileTO uploadFile(MultipartFile multipartFile) {
        String fileUrl = "";
        try {
            File file = convertMultiPartToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            String fileType=multipartFile.getContentType();
            long fileSize=multipartFile.getSize();
            fileUrl = endpointUrl + "/"+ fileName;
            FileTO fileTO=new FileTO();
            fileTO.setFileName(multipartFile.getOriginalFilename());
            fileTO.setFileType(fileType);
            fileTO.setFileUrl(fileUrl);
            fileTO.setFileSize(fileSize);
            fileTO.setMFileName(fileName);

            uploadFileTos3bucket(fileName, file);
            file.delete();
            return fileTO;
        } catch (Exception e) {
            throw new ApplicationException("while uploading file, throwing error");
        }
    }

    public String deleteFileFromS3Bucket(String fileUrl) {
        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        s3Client.deleteObject(new DeleteObjectRequest(bucketName + "/", fileName));
        return "Successfully deleted";
    }
}
