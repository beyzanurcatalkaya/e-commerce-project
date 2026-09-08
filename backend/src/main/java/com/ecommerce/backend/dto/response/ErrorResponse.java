package com.ecommerce.backend.dto.response;

public record ErrorResponse(
        int status,
        String message
) {
}