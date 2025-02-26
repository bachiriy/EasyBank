package com.customer.service.exceptions;

public class ResourceAlreadyExistsException extends RuntimeException {

	public ResourceAlreadyExistsException() {
		super();
	}

	public ResourceAlreadyExistsException(String message) {
		super(message);
	}
}
