package com.ecommerce.backend.dto.response;

public record ProductImageResponse(
        Long id,
        String url,
        Integer index
) {
}