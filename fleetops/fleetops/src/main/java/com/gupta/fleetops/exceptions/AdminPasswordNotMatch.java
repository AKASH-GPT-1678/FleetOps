package com.gupta.fleetops.exceptions;

public class AdminPasswordNotMatch extends RuntimeException {
    public AdminPasswordNotMatch(String message) {
        super(message);
    }
}
