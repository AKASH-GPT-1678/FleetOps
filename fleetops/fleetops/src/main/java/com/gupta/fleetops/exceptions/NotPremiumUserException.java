package com.gupta.fleetops.exceptions;

public class NotPremiumUserException extends RuntimeException {
    private final boolean isPremium;

    public NotPremiumUserException(String message, boolean isPremium) {
        super(message);
        this.isPremium = isPremium;
    }

    public boolean isPremium() {
        return isPremium;
    }
}
