package com.gupta.fleetops.exceptions;

public class NotPremiumUserException extends RuntimeException {
  public NotPremiumUserException(String message) {
    super(message);
  }
}
