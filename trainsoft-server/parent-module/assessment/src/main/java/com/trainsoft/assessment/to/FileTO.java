package com.trainsoft.assessment.to;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class FileTO implements Serializable {

  private static final long serialVersionUID = 4178168948127256418L;
  private  String fileName;
  private  String fileType;
  private  long fileSize;
  private  String fileUrl;
  private String mFileName;
}
