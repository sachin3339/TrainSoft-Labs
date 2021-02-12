package com.trainsoft.instructorled.commons;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.CommonHttpException;
import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.*;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

public final class HttpUtils {

    private static String getString(Map body, Map<String, String> headers, CloseableHttpClient client, HttpEntityEnclosingRequestBase httpPost) throws  UnsupportedEncodingException {
        if(null!= body)
            httpPost.setEntity(new StringEntity(CommonUtils.gsonSupplier.get().toJson(body)));
        Optional.ofNullable(headers).filter(m-> !m.isEmpty())
                .ifPresent(maps-> maps.forEach(httpPost::addHeader));
        //adding default content type header
        httpPost.addHeader("Content-type", "application/json");
        try (CloseableHttpResponse response = client.execute(httpPost)) {
            HttpEntity entityResponse;
            StatusLine sl= response.getStatusLine();
            // TODO code to handle success and failure responses
            switch (sl.getStatusCode()){
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                case 205:
                case 206:
                    entityResponse = response.getEntity();
                    return Optional.ofNullable(entityResponse).map(er -> {
                        try{ return EntityUtils.toString(er); }catch(Exception e){ return null; }
                    }).orElseThrow(ApplicationException::new);
                default:
                    throw CommonHttpException.builder().responseCode(sl.getStatusCode()).responseMessage(sl.getReasonPhrase()).build();
            }

        } catch (Exception e) {
            throw new ApplicationException(e);
        }
    }

    public static String postJsonUrl(Map body, String postUrl, Map<String,String> headers){
        try(CloseableHttpClient client = HttpClients.createDefault()){
            CommonUtils.verifyAllStringParams.accept(Collections.singletonList(StringParamNotNullValidator.
                    builder().param(postUrl).paramName("Post URL").build()));
            HttpPost httpPost = new HttpPost(postUrl);
            return getString(body,headers,client,httpPost);
        }catch (Exception e){
            throw new ApplicationException(e);
        }
    }
}
