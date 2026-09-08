package com.ecommerce.backend.dto.response;

public record CategoryResponse(
        Long id,
        String title,
        String gender,
        String image
) {
}