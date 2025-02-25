package com.account.service.exceptions;

public class ResourceAlreadyExistsException extends RuntimeException {

	public ResourceAlreadyExistsException() {
		super();
	}

	public ResourceAlreadyExistsException(String message) {
		super(message);
	}
}
