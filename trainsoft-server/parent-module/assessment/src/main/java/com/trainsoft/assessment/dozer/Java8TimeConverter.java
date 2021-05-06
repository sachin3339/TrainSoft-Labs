package com.trainsoft.assessment.dozer;

import org.dozer.DozerConverter;

import java.time.Instant;

public class Java8TimeConverter extends DozerConverter<Instant,Long>
{
    public Java8TimeConverter() {
        super(Instant.class,Long.class);
    }

    @Override
    public Long convertTo(Instant source, Long destination)
    {
        return source!=null?source.getEpochSecond():null;
    }

    @Override
    public Instant convertFrom(Long source, Instant destination)
    {
        return source!=null?Instant.ofEpochMilli(source):null;
    }
}
