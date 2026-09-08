package com.ecommerce.backend.dto.response;

public record OrderItemResponse(
        Long productId,
        String productName,
        Integer count,
        String detail
) {
}