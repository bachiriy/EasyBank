package com.customer.service.exceptions;

public class GeneralException extends RuntimeException {
    public GeneralException(){
        super();
    }
    
    public GeneralException(String message){
        super(message);
    }
}
