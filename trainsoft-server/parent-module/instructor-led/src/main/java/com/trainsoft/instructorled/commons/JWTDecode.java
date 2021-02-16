package com.trainsoft.instructorled.commons;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.DatatypeConverter;

public class JWTDecode {
    private static final Logger logger = LoggerFactory.getLogger(JWTDecode.class);
    public static final String JWT_TOKEN = "TrainSoft";
    //
    // This is to decode jwt token and get UserBasicsTO object.
    public static JWTTokenTO parseJWT(String jwtToken)  {
        try {
            Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(JWT_TOKEN))
                    .parseClaimsJws(jwtToken).getBody();
            return JsonUtils.fromJson(claims.getSubject(), JWTTokenTO.class);
        } catch (Exception e) {
            logger.error("While parsing jwt token, throwing error {}", e);
            throw new RuntimeException( "There are some issue, while processing jwt token");
        }
    }
}
