package com.trainsoft.instructorled.jwttoken;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

public class JWTTokenGen {
    public static final String GWT_KEY = "TrainSoft";
    public static String generateGWTToken(JWTTokenTO jwt) {


        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(GWT_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
        String subject=JsonUtils.toJson(jwt);
        JwtBuilder builder = Jwts.builder().setId(jwt.getUserSid())
                .setIssuedAt(DateUtils.getCurrentDate())
                .setSubject(subject)
                .setIssuer(jwt.getEmailId())
                .signWith(signatureAlgorithm, signingKey);
        Date exp = new Date(DateUtils.getTimeStampByCurrentDate() +100000000l);
        builder.setExpiration(exp);
        return builder.compact();
    }
}
